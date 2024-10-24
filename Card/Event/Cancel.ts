import { isoly } from "isoly"
import { isly } from "isly"

export interface Cancel {
	type: "cancel"
	at: isoly.DateTime
}
export namespace Cancel {
	export const type = isly.object<Cancel>({
		type: isly.string(),
		at: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
}
