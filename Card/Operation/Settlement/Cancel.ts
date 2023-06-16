import { isoly } from "isoly"
import { isly } from "isly"

export interface Cancel {
	type: "settlement.cancel"
	created: isoly.DateTime
}

export namespace Cancel {
	export const type = isly.object<Cancel>({
		type: isly.string("settlement.cancel"),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
