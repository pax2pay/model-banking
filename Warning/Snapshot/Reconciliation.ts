import { isoly } from "isoly"
import { isly } from "isly"
import { Base } from "../Base"

export interface Reconciliation extends Base {
	type: "reconciliation"
	severity?: "high"
	delta: { account: number; operation: number }
	currency: isoly.Currency
	account: string
}
export namespace Reconciliation {
	export const type = Base.type.extend<Reconciliation>({
		type: isly.string("reconciliation"),
		severity: isly.string(["high"]).optional(),
		currency: isly.string(),
		delta: isly.object({ account: isly.number(), operation: isly.number() }),
		account: isly.string(),
	})
}
