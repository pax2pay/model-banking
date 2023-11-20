import { isly } from "isly"
import { Base } from "./Base"

export interface Capture extends Capture.Creatable, Base {}

export namespace Capture {
	export interface Creatable extends Base.Creatable {
		type: "capture"
	}
	export namespace Creatable {
		export const type = Base.Creatable.type.extend<Creatable>({
			type: isly.string("capture"),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = Creatable.type.extend<Capture>({
		status: isly.string(["succeeded", "failed"]),
	})
	export const is = type.is
	export const flaw = type.flaw
}
