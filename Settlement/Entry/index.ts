import { gracely } from "gracely"
import { isly } from "isly"
import { Amount } from "../../Amount"
import { Transaction } from "../../Transaction"
import { Total } from "../Total"
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
	export namespace Cancel {
		export type Creatable = EntryCancel.Creatable
	}
	export type Capture = EntryCapture
	export const Capture = EntryCapture
	export namespace Capture {
		export type Creatable = EntryCapture.Creatable
	}
	export type Refund = EntryRefund
	export const Refund = EntryRefund
	export namespace Refund {
		export type Creatable = EntryRefund.Creatable
	}
	export type Unknown = EntryUnknown
	export const Unknown = EntryUnknown
	export namespace Unknown {
		export type Creatable = EntryUnknown.Creatable
	}
	export type Type = "unknown" | "refund" | "capture" | "cancel"
	export type Summary = EntrySummary
	export const Summary = EntrySummary
	export type Creatable = EntryCreatable
	export const Creatable = EntryCreatable
	export function compile(entry: Entry): Total {
		return entry.type == "unknown"
			? Total.initiate()
			: Total.initiate({ amount: Amount.toAmounts(entry.amount), fee: entry.fee })
	}
	export function from(creatable: Entry.Creatable, transaction: Transaction | gracely.Error | string): Entry {
		let result: Entry
		if (!Transaction.is(transaction) || transaction.status != "finalized")
			result = {
				status: "failed",
				reason: reason(creatable, transaction),
				...creatable,
			}
		else {
			switch (creatable.type) {
				case "capture":
					result = Capture.from(creatable)
					break
				case "refund":
					result = Refund.from(creatable, transaction)
					break
				default:
					result = { ...creatable, status: "failed", reason: "Entry type not implemented yet." }
					break
			}
		}
		return result
	}
	function reason(creatable: Entry.Creatable, transaction: Transaction | gracely.Error | string): string {
		const result = []
		!creatable.authorization && result.push("Missing authorization.")
		if (gracely.Error.is(transaction))
			result.push(
				`gracely error: ${transaction.status}, ${transaction.type}, ${transaction.header}, ${transaction.body}`
			)
		else if (typeof transaction != "string")
			result.push(`Transaction ${transaction.id} on account ${transaction.accountId} unable to be finalized.`)
		else
			result.push(transaction || "No reason provided")
		return result.join("\n")
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
