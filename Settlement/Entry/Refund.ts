import { isly } from "isly"
import { Base } from "./Base"

export interface Refund extends Refund.Creatable, Base {}

export namespace Refund {
	export interface Creatable extends Base.Creatable {
		type: "refund"
	}
	export namespace Creatable {
		export const type = Base.Creatable.type.extend<Creatable>({
			type: isly.string("refund"),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = Creatable.type.extend<Refund>({
		status: isly.string(["succeeded", "failed"]),
	})
	export const is = type.is
	export const flaw = type.flaw
}
