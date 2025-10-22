import { isly } from "isly"
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
}
