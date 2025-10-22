import { isly } from "isly"
import { Account } from "../Account"
import { Contact } from "./Contact"

export interface Changeable {
	name?: string
	contact?: Contact.Creatable
	fx?: Account.Fx
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: isly.string().optional(),
		contact: Contact.Creatable.type.optional(),
		fx: Account.Fx.type.optional(),
	})
}
