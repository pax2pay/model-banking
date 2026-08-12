import { isly } from "isly"
import { zod } from "../zod"
import { Contact } from "./Contact"

export interface Changeable {
	name?: string
	contact?: Contact.Creatable
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: isly.string().optional(),
		contact: Contact.Creatable.type.optional(),
	})
	export const typeZod = zod.object({
		name: zod.string().optional(),
		contact: Contact.Creatable.typeZod.optional(),
	})
}
