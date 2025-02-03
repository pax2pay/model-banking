import { gracely } from "gracely"
import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../../Card"
import { Rail } from "../../Rail"
import { Transaction } from "../../Transaction"
import { Creatable as EntryCreatable } from "./Creatable"
import { Failed as EntryFailed } from "./Failed"
import * as mapping from "./fromLegacy"
import { Entry as LegacyEntry } from "./Legacy"
import { Succeeded as EntrySucceeded } from "./Succeeded"
import { Summary as EntrySummary } from "./Summary"

export type Entry = EntrySucceeded | EntryFailed
export namespace Entry {
	export interface Capture extends EntrySucceeded {
		type: "capture"
	}
	export interface Refund extends EntrySucceeded {
		type: "refund"
	}
	export import Creatable = EntryCreatable
	export import Summary = EntrySummary
	export import Legacy = LegacyEntry
	export import Failed = EntryFailed
	export import Succeeded = EntrySucceeded
	export const fromLegacy = mapping.fromLegacy
	export const type = isly.union<Entry, EntrySucceeded, EntryFailed>(EntrySucceeded.type, EntryFailed.type)
	export function from(
		creatable: Entry.Creatable,
		transaction: Transaction.CardTransaction | gracely.Error | string,
		card?: Card
	): Entry {
		let result: Entry
		const reasons: string[] = []
		const created = isoly.DateTime.now()
		if (creatable.type == "unknown")
			reasons.push("Unknown entry type.")
		if (gracely.Error.is(transaction))
			reasons.push(`gracely error: ${JSON.stringify(transaction)}`)
		else if (typeof transaction == "string")
			reasons.push(transaction || "No reason provided.")
		else if (transaction.status != "finalized")
			reasons.push(`Transaction ${transaction.id} on account ${transaction.accountId} unable to be finalized.`)
		if (reasons.length > 0)
			result = { status: "failed", reason: reasons.join("\n"), ...creatable, created }
		else if (!card)
			result = { status: "failed", reason: "Missing card", ...creatable, created }
		else
			result = {
				status: "succeeded",
				...(creatable as Creatable.Known),
				created,
				card: Rail.Address.Card.from(card),
				transaction: (transaction as Transaction.CardTransaction).id,
			}
		return result
	}
}
