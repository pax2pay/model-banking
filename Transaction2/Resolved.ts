import { isoly } from "isoly"
import { Rail } from "../Rail"
import { Creatable } from "./Creatable"

export interface Resolved extends Creatable {
	account: Resolved.Address
	created: isoly.DateTime
	description: string
	rail?: Rail
}
export namespace Resolved {
	export type Address = Rail.Address & { type: "card"; id: string }
}
