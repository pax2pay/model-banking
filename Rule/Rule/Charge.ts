import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"
import { Realm } from "../../Realm"
import { Base } from "./Base"

export interface Charge extends Base {
	action: Charge.Action
	charge: {
		percentage?: number
		fixed?: number | Amount
	}
}
export namespace Charge {
	export type Action = typeof Action.value
	export namespace Action {
		export const value = "charge"
	}
	export const type = Base.type.extend<Charge>({
		action: isly.string(Action.value),
		charge: isly.object({
			percentage: isly.number().optional(),
			fixed: isly.union<number | Amount>(Amount.type, isly.number()).optional(),
		}),
	})
	export interface Backend extends Charge {
		charge: {
			percentage?: number
			fixed?: Amount
		}
	}
	export function toBackend(rule: Charge, realm: Realm): Backend
	export function toBackend(rule: Charge, currency: isoly.Currency): Backend
	export function toBackend(rule: Charge, currency: Realm | isoly.Currency): Backend {
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
}
