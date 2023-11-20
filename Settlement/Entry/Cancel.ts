import { isly } from "isly"
import { Base } from "./Base"

export interface Cancel extends Cancel.Creatable, Base {}

export namespace Cancel {
	export interface Creatable extends Base.Creatable {
		type: "cancel"
	}
	export namespace Creatable {
		export const type = Base.Creatable.type.extend<Creatable>({
			type: isly.string("cancel"),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = Creatable.type.extend<Cancel>({
		status: isly.string(["succeeded", "failed"]),
	})
	export const is = type.is
	export const flaw = type.flaw
}
