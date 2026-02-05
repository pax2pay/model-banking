import { DurableObjectLocationHint } from "@cloudflare/workers-types"
import { isly } from "isly"
import { Type } from "./Type"

export interface Creatable {
	name: string
	location?: Creatable.Location
	type?: Type
}

export namespace Creatable {
	export type Location = typeof Location.values[number]
	export namespace Location {
		export const values = ["north-east-america", "west-europe"] as const
		export function toCloudflare(value: Location): DurableObjectLocationHint {
			return value == "north-east-america" ? "enam" : "weur"
		}
		// All location hints: ["wnam", "enam", "sam", "weur", "eeur", "apac", "oc", "afr", "me"]
		export const type = isly.string(values)
	}
	export const type = isly.object<Creatable>({
		name: isly.string(),
		location: Location.type.optional(),
		type: Type.type,
	})
}
