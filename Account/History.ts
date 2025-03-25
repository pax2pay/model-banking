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
		export const values = [
			"status",
			"rails",
			"counterparts",
			"rules",
			"created",
			"updated",
			"buffer",
			"listeners",
		] as const
		export const type = isly.string<Property>("value", ...values)
	}
	export const type = isly.object<History>({
		timestamp: isoly.DateTime.type,
		property: Property.type,
		to: isly.any().optional(),
	})
}
