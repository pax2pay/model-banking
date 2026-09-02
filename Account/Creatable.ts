import { DurableObjectLocationHint } from "@cloudflare/workers-types" // TODO: REMOVE
import { isly } from "isly"
import { zod, zodHelper } from "../zod"

export interface Creatable {
	name: string
	location?: Creatable.Location
}
export namespace Creatable {
	export type Location = (typeof Location.values)[number]
	export namespace Location {
		export const values = ["north-east-america", "west-europe"] as const
		export function toCloudflare(value: Location): DurableObjectLocationHint {
			return value == "north-east-america" ? "enam" : "weur"
		}
		// All location hints: ["wnam", "enam", "sam", "weur", "eeur", "apac", "oc", "afr", "me"]
		export const type = isly.string(values)
		export const typeZod: zod.ZodType<Location> = zod.enum(values)
	}
	export const type = isly.object<Creatable>({ name: isly.string(), location: Location.type.optional() })
	export const typeZod = zodHelper.fromType<Creatable>()({
		name: zod.string(),
		location: Location.typeZod.optional(),
	})
}
const a = Creatable.typeZod.parse({})
