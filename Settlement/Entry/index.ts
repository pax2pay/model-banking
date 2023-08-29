import { gracely } from "gracely"
import { isly } from "isly"
import { Authorization } from "../../Authorization"
import { Transaction } from "../../Transaction"
import { Cancel as EntryCancel } from "./Cancel"
import { Capture as EntryCapture } from "./Capture"
import { Creatable as EntryCreatable } from "./Creatable"
import { Refund as EntryRefund } from "./Refund"
import { Summary as EntrySummary } from "./Summary"
import { Unknown as EntryUnknown } from "./Unknown"

export type Entry = Entry.Cancel | Entry.Capture | Entry.Refund | Entry.Unknown

export namespace Entry {
	export type Cancel = EntryCancel
	export const Cancel = EntryCancel
	export type Capture = EntryCapture
	export const Capture = EntryCapture
	export type Creatable = EntryCreatable
	export const Creatable = EntryCreatable
	export type Refund = EntryRefund
	export const Refund = EntryRefund
	export type Summary = EntrySummary
	export const Summary = EntrySummary
	export type Unknown = EntryUnknown
	export const Unknown = EntryUnknown
	export function from(
		creatable: Entry.Creatable,
		transaction: Transaction | gracely.Error | any,
		authorization: Authorization
	): Entry {
		return Transaction.is(transaction)
			? {
					status: "succeeded",
					authorization,
					...creatable,
			  }
			: {
					status: "failed",
					authorization,
					...creatable,
			  }
	}
	export const type = isly.union<Entry, Entry.Cancel, Entry.Capture, Entry.Refund, Entry.Unknown>(
		Entry.Cancel.type,
		Entry.Capture.type,
		Entry.Refund.type,
		Entry.Unknown.type
	)
	export const is = type.is
	export const flaw = type.flaw
}
