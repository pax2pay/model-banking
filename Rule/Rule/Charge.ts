import { isly } from "isly"
import { Base } from "./Base"

export interface Charge extends Base {
	action: Charge.Action
	type: Charge.Type
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
	export type Type = typeof Type.value[number]
	export namespace Type {
		export const value = ["refund", "capture"] as const
	}
	export const type = Base.type.extend<Charge>({
		action: isly.string(Action.value),
		type: isly.string(Type.value),
		fee: isly.object({
			percentage: isly.number(),
			// flat?: number
		}),
	})
}
