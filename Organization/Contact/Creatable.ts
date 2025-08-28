import { isly } from "isly"
import { Addresses } from "./Addresses"
import { Name } from "./Name"
import { Phone } from "./Phone"

export interface Creatable {
	address: Addresses
	email: string
	name: Name
	phone: Phone
	owners: Name[]
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		address: Addresses.type,
		email: isly.string(/^\S+@\S+\.\S+$/),
		name: Name.type,
		phone: Phone.type,
		owners: Name.type.array({ criteria: "minLength", value: 1 }),
	})
}
