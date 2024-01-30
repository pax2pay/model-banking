import { isly } from "isly"
import { Contact } from "./Contact"

export interface Changeable {
	name?: string
	contact?: Contact
	groups?: string[]
}

export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: isly.string().optional(),
		contact: Contact.type.optional(),
		groups: isly.string().array().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
