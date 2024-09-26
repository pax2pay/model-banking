import { isoly } from "isoly"
import { selectively } from "selectively"
import { isly } from "isly"
import { Amount } from "../Amount"
import { Exchange } from "../Exchange"
import { Realm } from "../Realm"
import { Base } from "./Base"
import { control } from "./control"
import type { State } from "./State"

export interface Charge extends Charge.Api {
	charge: {
		percentage?: number
		fixed?: Amount
	}
}
export namespace Charge {
	export type Action = typeof Action.value
	export namespace Action {
		export const value = "charge"
	}
	export interface Api extends Base {
		action: Charge.Action
		charge: {
			percentage?: number
			fixed?: number | Amount
		}
	}
	export namespace Api {
		export const type = Base.type.extend<Api>({
			action: isly.string(Action.value),
			charge: isly.object({
				percentage: isly.number().optional(),
				fixed: isly.union<number | Amount>(Amount.type, isly.number()).optional(),
			}),
		})
	}
	export function fromApi(rule: Api, realm: Realm): Charge
	export function fromApi(rule: Api, currency: isoly.Currency): Charge
	export function fromApi(rule: Api, currency: Realm | isoly.Currency): Charge {
		return {
			...rule,
			charge: {
				...rule.charge,
				fixed:
					typeof rule.charge.fixed == "number"
						? [Realm.is(currency) ? Realm.currency[currency] : currency, rule.charge.fixed]
						: rule.charge.fixed,
			},
		}
	}
	export function evaluate(
		rules: Charge[],
		state: State,
		macros?: Record<string, selectively.Definition>,
		table: Exchange.Rates = {}
	): { outcomes: Charge[]; charge: number } {
		const result: ReturnType<typeof evaluate> = {
			outcomes: [],
			charge: state.transaction.original.charge ?? 0,
		}
		for (const rule of rules) {
			if (control(rule, state, macros)) {
				if (rule.charge.percentage)
					result.charge = isoly.Currency.add(
						state.transaction.currency,
						result.charge,
						isoly.Currency.multiply(state.transaction.currency, state.transaction.amount, rule.charge.percentage / 100)
					)
				if (rule.charge.fixed) {
					const charge =
						state.transaction.currency === rule.charge.fixed[0]
							? rule.charge.fixed[1]
							: Exchange.convert(rule.charge.fixed[1], rule.charge.fixed[0], state.transaction.currency, table) ?? 0
					result.charge = isoly.Currency.add(state.transaction.currency, result.charge, charge)
				}
				result.outcomes.push(rule)
			}
		}
		return result
	}
	export function apply(charge: number, state: State): number {
		return state.transaction.kind == "authorization" ||
			state.transaction.kind == "outbound" ||
			state.transaction.kind == "capture"
			? isoly.Currency.add(state.transaction.original.currency, state.transaction.original.amount, charge)
			: isoly.Currency.subtract(state.transaction.original.currency, state.transaction.original.amount, charge)
	}
}
