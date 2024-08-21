import { isoly } from "isoly"
import { isly } from "isly"

export interface Unguarded {
	type: "unguarded"
	date: isoly.Date
	currency: isoly.Currency
	transaction: { id: string; created: isoly.DateTime }
}
export namespace Unguarded {
	export const type = isly.object<Unguarded>({
		type: isly.string("unguarded"),
		date: isly.string(),
		currency: isly.string(),
		transaction: isly.object<Unguarded["transaction"]>({ id: isly.string(), created: isly.string() }),
	})
}
