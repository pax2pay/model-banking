import { isoly } from "isoly"
import { isly } from "isly"

export interface GB {
	countryCode: "GB"
	city: string
	street: string
	building: string
	zipCode: string
}

export namespace GB {
	export const name = isoly.CountryCode.Name.en.from("GB")
	export const type = isly.object<GB>({
		countryCode: isly.string("GB"),
		city: isly.string(),
		street: isly.string(),
		building: isly.string(),
		zipCode: isly.string(),
	})
}
