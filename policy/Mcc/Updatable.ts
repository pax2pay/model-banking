import { isly } from "isly"
import { zod } from "../../zod"
import { Creatable } from "./Creatable"

export interface Updatable extends Creatable {
	id: string
}
export namespace Updatable {
	export const type = Creatable.type.extend<Updatable>({ id: isly.string() })
	export const typeZod = Creatable.typeZod.extend({ id: zod.string() })
}
