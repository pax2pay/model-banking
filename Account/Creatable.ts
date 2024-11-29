import { DurableObjectLocationHint } from "@cloudflare/workers-types"
import { isly } from "isly"

export interface Creatable {
	name: string
	location?: Creatable.Location
}

export namespace Creatable {
	export type Location = typeof Location.values[number]
	export namespace Location {
		export const values = ["east-north-america", "west-europe"] as const
		export function toCloudflare(value: Location): DurableObjectLocationHint {
			return value == "east-north-america" ? "enam" : "weur"
		}
		// All location hints: ["wnam", "enam", "sam", "weur", "eeur", "apac", "oc", "afr", "me"]
		export const type = isly.string(values)
	}

	export const type = isly.object<Creatable>({ name: isly.string(), location: Location.type.optional() })
}
