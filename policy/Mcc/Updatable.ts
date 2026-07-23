import { isly } from "isly"
import { Creatable } from "./Creatable"

export interface Updatable extends Creatable {
	id: string
}
export namespace Updatable {
	export const type = Creatable.type.extend<Updatable>({ id: isly.string() })
}
