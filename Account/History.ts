import { isly } from "isly"
import { isoly } from "isoly"

export type History = {
	 timestamp: isoly.DateTime,
    property: "status" | "rails"
    to: string
}

export namespace History {
	export type Property = typeof Property.values[number]
	export namespace Property {
		export const values = ["status", "rails", "counterparts", "rules"] as const
	}
	export const type = isly.object<History>({
		timestamp: isly.string<Property>(Property.values),
		property: isly.string(),
		to: isly.string()
	})
	export const is = type.is
	export const flaw = type.flaw
}
