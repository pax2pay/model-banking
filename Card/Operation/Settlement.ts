import { isoly } from "isoly"
import { isly } from "isly"

export interface Settlement {
	type: "settlement"
	status: "capture" | "cancel" | "refund"
	transaction?: string
	created: isoly.DateTime
}

export namespace Settlement {
	export const type = isly.object<Settlement>({
		type: isly.string("settlement"),
		status: isly.union(isly.string("capture"), isly.string("cancel"), isly.string("refund")),
		transaction: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
