import { isly } from "isly"
import { Address as ContactAddress } from "./Address"
import { Addresses as ContactAddresses } from "./Addresses"
import { Creatable as ContactCreatable } from "./Creatable"
import { Name as ContactName } from "./Name"
import { Phone as ContactPhone } from "./Phone"

export interface Contact {
	address: Contact.Addresses
	email: string
	name: Contact.Name
	phone: Contact.Phone
	owners?: Contact.Name[]
}
export namespace Contact {
	export import Addresses = ContactAddresses
	export import Address = ContactAddress
	export import Name = ContactName
	export import Phone = ContactPhone
	export import Creatable = ContactCreatable
	export const type = isly.object<Contact>({
		address: Addresses.type,
		email: isly.string(/^\S+@\S+\.\S+$/),
		name: Name.type,
		phone: Phone.type,
		owners: Name.type.array().optional(),
	})
}
