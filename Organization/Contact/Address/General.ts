import { isoly } from "isoly"
import { isly } from "isly"

export interface Default {
	countryCode: Exclude<isoly.CountryCode.Alpha2, "GB" | "SE">
	state?: string
	county?: string
	city: string
	zipCode: string
	street: string
}

export namespace Default {
	export const type = isly.object<Default>({
		countryCode: isly.string(),
		state: isly.string().optional(),
		county: isly.string().optional(),
		city: isly.string(),
		street: isly.string(),
		zipCode: isly.string(),
	})
}
