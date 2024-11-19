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
export interface Reserve extends Reserve.Api {
	reserve: {
		percentage?: number
		fixed?: Amount
	}
}
export namespace Reserve {
	export type Action = typeof Action.value
	export namespace Action {
		export const value = "reserve"
	}
	export const type = Base.type.extend<Reserve>({
		action: isly.string(Action.value),
		reserve: isly.object({
			percentage: isly.number(),
			fixed: Amount.type.optional(),
		}),
	})

	export interface Api extends Base {
		action: Reserve.Action
		reserve: {
			percentage?: number
			fixed?: number | Amount
		}
	}
	export namespace Api {
		export const type = Base.type.extend<Api>({
			action: isly.string(Action.value),
			reserve: isly.object({
				percentage: isly.number().optional(),
				fixed: isly.union<number | Amount>(Amount.type, isly.number()).optional(),
			}),
		})
	}
	export function fromApi(rule: Api, realm: Realm): Reserve
	export function fromApi(rule: Api, currency: isoly.Currency): Reserve
	export function fromApi(rule: Api, currency: Realm | isoly.Currency): Reserve {
		return {
			...rule,
			reserve: {
				...rule.reserve,
				fixed:
					typeof rule.reserve.fixed == "number"
						? [Realm.type.is(currency) ? Realm.currency[currency] : currency, rule.reserve.fixed]
						: rule.reserve.fixed,
			},
		}
	}
	export function evaluate(
		rules: Reserve[],
		state: State,
		macros?: Record<string, selectively.Definition>,
		table: Exchange.Rates = {}
	): { outcomes: Reserve[]; notes: Note[]; reserve: number } {
		const result: ReturnType<typeof evaluate> = {
			outcomes: [],
			notes: [],
			reserve: 0,
		}
		const now = isoly.DateTime.now()
		if (
			state.transaction.stage == "initiate" &&
			["authorization", "outbound"].some(kind => kind == state.transaction.kind) &&
			["card", "external"].some(type => type == state.transaction.type)
		)
			for (const rule of rules)
				if (control(rule, state, macros)) {
					if (rule.reserve.percentage)
						result.reserve = isoly.Currency.add(
							state.transaction.original.currency,
							result.reserve,
							isoly.Currency.multiply(
								state.transaction.original.currency,
								state.transaction.original.amount,
								rule.reserve.percentage / 100
							)
						)
					if (rule.reserve.fixed) {
						const reserve =
							state.transaction.original.currency === rule.reserve.fixed[0]
								? rule.reserve.fixed[1]
								: Exchange.convert(
										rule.reserve.fixed[1],
										rule.reserve.fixed[0],
										state.transaction.original.currency,
										table
								  ) ?? 0
						result.reserve = isoly.Currency.add(state.transaction.original.currency, result.reserve, reserve)
					}
					result.outcomes.push(rule)
					result.notes.push({ author: "automatic", created: now, text: rule.name, rule })
				}
		return result
	}
	export function apply(reserve: number, state: State): number {
		return state.transaction.kind == "authorization" ||
			state.transaction.kind == "outbound" ||
			state.transaction.kind == "capture"
			? isoly.Currency.add(state.transaction.original.currency, state.transaction.original.total, reserve)
			: isoly.Currency.subtract(state.transaction.original.currency, state.transaction.original.total, reserve)
	}
}
