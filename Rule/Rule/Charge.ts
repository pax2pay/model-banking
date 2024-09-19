import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"
import { Realm } from "../../Realm"
import { Base } from "./Base"

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
		export function from(rule: Api, realm: Realm): Charge
		export function from(rule: Api, currency: isoly.Currency): Charge
		export function from(rule: Api, currency: Realm | isoly.Currency): Charge {
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
}
