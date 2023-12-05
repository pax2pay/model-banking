import { isly } from "isly"
import { Balances } from "../Balances"
import { Counterbalances } from "../CounterBalances"
import { Change as Change } from "./Change"

export type Changes = Partial<Record<Changes.Entry | Counterbalances.Counterbalance.Entry.Internal, Change>> &
	Record<Counterbalances.Counterbalance.Entry.Settlement, Change>

export namespace Changes {
	export type Entry = Balances.Balance.Entry
	export namespace Entry {
		export const values = [...Balances.Balance.Entry.values, ...Counterbalances.Counterbalance.Entry.values]
		export const type = isly.string(values)
	}
	export const type = isly.record<Changes>(Entry.type, Change.type)
	export const is = type.is
	export const flaw = type.flaw
}
