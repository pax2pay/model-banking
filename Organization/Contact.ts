import { isoly } from "isoly"
import { isly } from "isly"

export interface Contact {
	address: string
	city: string
	zip: string
	country: isoly.CountryCode.Alpha2
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
		address: isly.string(),
		city: isly.string(),
		zip: isly.string(),
		country: isly.fromIs("CountryCode.Alpha2", isoly.CountryCode.Alpha2.is),
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
