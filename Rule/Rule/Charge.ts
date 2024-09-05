import { isly } from "isly"
import { Amounts } from "../../Amounts"
import { Base } from "./Base"

export interface Charge extends Base {
	action: Charge.Action
	charge: {
		percentage?: number
		fixed?: Amounts
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
			fixed: Amounts.type.optional(),
		}),
	})
}
