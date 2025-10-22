import { isly } from "isly"
import { Fx } from "../Account/Fx"
import { Contact } from "./Contact"

export interface Changeable {
	name?: string
	contact?: Contact.Creatable
	fx?: Fx
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: isly.string().optional(),
		contact: Contact.Creatable.type.optional(),
		fx: Fx.type.optional(),
	})
}
