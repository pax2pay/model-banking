import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
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
}
