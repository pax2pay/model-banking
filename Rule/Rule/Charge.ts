import { isly } from "isly"
import { Base } from "./Base"

export interface Charge extends Base {
	action: Charge.Action
	fee: {
		percentage: number
		// flat?: number
	}
}
export namespace Charge {
	export type Action = typeof Action.value
	export namespace Action {
		export const value = "charge"
	}
	export const type = Base.type.extend<Charge>({
		action: isly.string(Action.value),
		fee: isly.object({
			percentage: isly.number(),
			// flat?: number
		}),
	})
}
