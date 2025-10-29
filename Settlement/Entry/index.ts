import { isoly } from "isoly"
import { Account } from "../../Account"
import { Preset } from "../../Card/Preset"
import type { Rail } from "../../Rail"
import type { Transaction } from "../../Transaction"
import { Creatable as EntryCreatable } from "./Creatable"
import { Failed as EntryFailed } from "./Failed"
import { fromCreatable } from "./fromCreatable"
import { Succeeded as EntrySucceeded } from "./Succeeded"
import { Summary as EntrySummary } from "./Summary"
import { type as entryType } from "./type"

export type Entry = EntrySucceeded | EntryFailed
export namespace Entry {
	export interface Capture extends EntrySucceeded {
		type: "capture"
	}
	export interface Refund extends EntrySucceeded {
		type: "refund"
	}
	export import Creatable = EntryCreatable
	export import Failed = EntryFailed
	export import Succeeded = EntrySucceeded
	export import Summary = EntrySummary
	export const type = entryType
	export const from = fromCreatable
	export function charge(
		counterpart: Rail.Address.Card.Counterpart,
		capture: Creatable.Capture,
		preset?: Preset,
		charges?: Account.Charge
	): Transaction.Amount.Charge {
		return Account.Charge.evaluate(
			counterpart,
			capture.amount[0],
			isoly.Currency.add(capture.amount[0], capture.amount[1], capture.fee.other[capture.amount[0]] ?? 0),
			preset,
			charges,
			capture.exchange
		)
	}
}
