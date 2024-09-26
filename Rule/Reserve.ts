import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../Amount"
import { Realm } from "../Realm"
import { Base } from "./Base"

export interface Reserve extends Base {
	action: Reserve.Action
	reserve: {
		percentage?: number
		fixed?: number | Amount
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
			fixed: isly.union<number | Amount>(isly.number(), Amount.type).optional(),
		}),
	})
	export interface Backend extends Reserve {
		reserve: {
			percentage?: number
			fixed?: Amount
		}
	}
	export function toBackend(rule: Reserve, realm: Realm): Backend
	export function toBackend(rule: Reserve, currency: isoly.Currency): Backend
	export function toBackend(rule: Reserve, currency: Realm | isoly.Currency): Backend {
		return {
			...rule,
			reserve: {
				...rule.reserve,
				fixed:
					typeof rule.reserve.fixed == "number"
						? [Realm.is(currency) ? Realm.currency[currency] : currency, rule.reserve.fixed]
						: rule.reserve.fixed,
			},
		}
	}
}
