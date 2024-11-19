import { isly } from "isly"

export interface SE {
	countryCode: "SE"
	zipCode: string
	city: string
	street: string
}
export namespace SE {
	export const type = isly.object<SE>({
		countryCode: isly.string("SE"),
		zipCode: isly.string(),
		city: isly.string(),
		street: isly.string(),
	})
}
