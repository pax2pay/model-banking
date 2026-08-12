import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../../zod"

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
	export const typeZod = zod.object({
		countryCode: zod.string(),
		state: zod.string().optional(),
		county: zod.string().optional(),
		city: zod.string(),
		zipCode: zod.string(),
		street: zod.string(),
	})
}
