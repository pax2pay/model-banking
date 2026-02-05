import { isly } from "isly"
import { Type } from "../Account/Type"
import { Contact } from "./Contact"

export interface Changeable {
	name?: string
	contact?: Contact.Creatable
	type?: Type
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: isly.string().optional(),
		contact: Contact.Creatable.type.optional(),
		type: Type.type.optional(),
	})
}
