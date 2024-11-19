import { isly } from "isly"
import { Contact } from "./Contact"

export interface Changeable {
	name?: string
	contact?: Contact
}

export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: isly.string().optional(),
		contact: Contact.type.optional(),
	})
}
