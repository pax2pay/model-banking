import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../Amount"
import { Amounts } from "../Amounts"

export interface Settled {
	paid: Amounts
	transactions: string[]
}

export namespace Settled {
	export const type = isly.object<Settled>({
		by: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		transactions: isly.record(
			isly.string(),
			isly.object({ status: isly.string(["failed", "success"]), amount: Amount.type })
		),
	})
	export const is = type.is
	export const flaw = type.flaw
}
