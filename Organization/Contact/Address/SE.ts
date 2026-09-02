import { isly } from "isly"
import { zod } from "../../../zod"

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
	export const typeZod: zod.ZodType<SE> = zod.object({
		countryCode: zod.literal("SE"),
		zipCode: zod.string(),
		city: zod.string(),
		street: zod.string(),
	})
}
