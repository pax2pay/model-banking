import { gracely } from "gracely"
import { isoly } from "isoly"
import { isly } from "isly"
import { Transaction } from "../../../Transaction"
import { Cancel as EntryCancel } from "./Cancel"
import { Capture as EntryCapture } from "./Capture"
import { Creatable as EntryCreatable } from "./Creatable"
import { Refund as EntryRefund } from "./Refund"
import { Summary as EntrySummary } from "./Summary"
import { Unknown as EntryUnknown } from "./Unknown"

export type Entry = Entry.Cancel | Entry.Capture | Entry.Refund | Entry.Unknown
export namespace Entry {
	export import Cancel = EntryCancel
	export import Capture = EntryCapture
	export import Refund = EntryRefund
	export import Unknown = EntryUnknown
	export type Type = "unknown" | "refund" | "capture" | "cancel"
	export import Summary = EntrySummary
	export import Creatable = EntryCreatable
	export function from(creatable: Entry.Creatable, transaction: Transaction | gracely.Error | string): Entry {
		let result: Entry
		const created = isoly.DateTime.now()
		if (!Transaction.type.is(transaction) || transaction.status != "finalized")
			result = { status: "failed", reason: reason(creatable, transaction), ...creatable, created }
		else
			switch (creatable.type) {
				case "capture":
					result = Capture.from(creatable)
					break
				case "refund":
					result = Refund.from(creatable, transaction)
					break
				default:
					result = { ...creatable, status: "failed", reason: "Entry type not implemented yet.", created }
					break
			}
		return result
	}
	function reason(creatable: Entry.Creatable, transaction: Transaction | gracely.Error | string): string {
		const result: string[] = []
		!creatable.authorization && result.push("Missing authorization.")
		if (gracely.Error.is(transaction))
			result.push(`gracely error: ${JSON.stringify(transaction)}`)
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
}
