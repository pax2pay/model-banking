import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../Amount"

export interface Settled {
	by?: string
	created: isoly.DateTime
	transactions: Record<string, Amount>
}

export namespace Settled {
	export const type = isly.object<Settled>({
		by: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		transactions: isly.record(isly.string(), Amount.type),
	})
	export const is = type.is
	export const flaw = type.flaw
}