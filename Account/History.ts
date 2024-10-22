import { isoly } from "isoly"
import { isly } from "isly"

export type History = {
	timestamp: isoly.DateTime
	property: "status" | "rails" | "counterparts" | "rules"
	to: string
}

export namespace History {
	export type Property = typeof Property.values[number]
	export namespace Property {
		export const values = ["status", "rails", "counterparts", "rules"] as const
		export const type = isly.string<Property>(values)
	}
	export const type = isly.object<History>({
		timestamp: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		property: Property.type,
		to: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
