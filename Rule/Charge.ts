import { isoly } from "isoly"
import { selectively } from "selectively"
import { isly } from "isly"
import { Amount } from "../Amount"
import { Exchange } from "../Exchange"
import { Realm } from "../Realm"
import type { Note } from "../Transaction/Note"
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
	): { outcomes: Charge[]; notes: Note[]; charge: Required<State["transaction"]["original"]>["charge"] } {
		const result: ReturnType<typeof evaluate> = {
			outcomes: [],
			notes: [],
			charge: { current: 0, total: state.transaction.original.charge?.total ?? 0 },
		}
		const now = isoly.DateTime.now()
		if (state.transaction.stage == "finalize" && ["card", "external"].some(type => type == state.transaction.type))
			for (const rule of rules) {
				if (control(rule, state, macros)) {
					if (rule.charge.percentage)
						result.charge.current = isoly.Currency.add(
							state.transaction.original.currency,
							result.charge.current,
							isoly.Currency.multiply(
								state.transaction.original.currency,
								state.transaction.original.amount,
								rule.charge.percentage / 100
							)
						)
					if (rule.charge.fixed) {
						const charge =
							state.transaction.original.currency === rule.charge.fixed[0]
								? rule.charge.fixed[1]
								: Exchange.convert(
										rule.charge.fixed[1],
										rule.charge.fixed[0],
										state.transaction.original.currency,
										table
								  ) ?? 0
						result.charge.current = isoly.Currency.add(
							state.transaction.original.currency,
							result.charge.current,
							charge
						)
					}
					result.outcomes.push(rule)
					result.notes.push({ author: "automatic", created: now, text: rule.name, rule })
				}
			}
		result.charge.total = isoly.Currency.add(
			state.transaction.original.currency,
			result.charge.current,
			result.charge.total
		)
		return result
	}
	export function apply(charge: { current: number; total: number }, state: State): number {
		return state.transaction.kind == "authorization" ||
			state.transaction.kind == "outbound" ||
			state.transaction.kind == "capture"
			? isoly.Currency.add(state.transaction.original.currency, state.transaction.original.total, charge.current)
			: isoly.Currency.subtract(state.transaction.original.currency, state.transaction.original.total, charge.current)
	}
}
