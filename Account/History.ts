import { isoly } from "isoly"
import { isly } from "isly"

export type History = {
	timestamp: isoly.DateTime
	property: History.Property
	to?: any
}

export namespace History {
	export type Property = typeof Property.values[number]
	export namespace Property {
		export const values = ["status", "rails", "counterparts", "rules", "created", "updated"] as const
		export const type = isly.string<Property>(values)
	}
	export const type = isly.object<History>({
		timestamp: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		property: Property.type,
		to: isly.any().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
