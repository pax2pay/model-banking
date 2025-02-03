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
import { Summary as EntrySummary } from "./Summary"

export interface Entry extends Omit<Entry.Creatable.Known, "transaction" | "card"> {
	status: "succeeded"
	card: Rail.Address.Card
	transaction: string
	created: isoly.DateTime
}
export namespace Entry {
	export interface Capture extends Entry {
		type: "capture"
	}
	export interface Refund extends Entry {
		type: "refund"
	}
	export import Creatable = EntryCreatable
	export import Summary = EntrySummary
	export import Legacy = LegacyEntry
	export import Failed = EntryFailed
	export const fromLegacy = mapping.fromLegacy
	export const type = EntryCreatable.Known.type.omit<"transaction" | "card">(["card", "transaction"]).extend<Entry>({
		status: isly.string<"succeeded">("succeeded"),
		card: Rail.Address.Card.type,
		transaction: isly.string(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export function from(
		creatable: Entry.Creatable,
		transaction: Transaction.CardTransaction | gracely.Error | string,
		card?: Card
	): Entry | Entry.Failed {
		let result: Entry | Entry.Failed
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
