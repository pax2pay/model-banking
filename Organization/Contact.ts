import { isoly } from "isoly"
import { isly } from "isly"
import { Addresses } from "../Addresses"

export interface Contact {
	address: Addresses
	email: `${string}@${string}.${string}`
	name: {
		first: string
		last: string
	}
	phone: {
		number: `${number}`
		code: isoly.CallingCode
	}
}

export namespace Contact {
	export const type = isly.object<Contact>({
		address: Addresses.type,
		email: isly.string(),
		name: isly.object<Contact["name"]>({
			first: isly.string(),
			last: isly.string(),
		}),
		phone: isly.object<Contact["phone"]>({
			number: isly.string(),
			code: isly.fromIs("CallingCode", isoly.CallingCode.is),
		}),
	})
}
