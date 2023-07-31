import { isoly } from "isoly"
import { isly } from "isly"

export interface Default {
	countryCode: isoly.CountryCode.Alpha2
	state?: string
	county?: string
	city: string
	zipCode: string
	street: string
}

export namespace Default {
	export const type = isly.object<Default>({
		countryCode: isly.string("GB"),
		state: isly.string().optional(),
		county: isly.string().optional(),
		city: isly.string(),
		street: isly.string(),
		zipCode: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
