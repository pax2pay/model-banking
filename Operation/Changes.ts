import { isoly } from "isoly"
import { isly } from "isly"
import { Balances } from "../Balances"
import { Counterbalance2 } from "../Counterbalance2"
import { Counterbalances } from "../CounterBalances"
import { Change } from "./Change"

// TODO: remove old counterbalances
export type Changes = Partial<Record<Balances.Balance.Entry, Change>> & Record<Changes.Entry.Counterbalance, Change>

export namespace Changes {
	export namespace Entry {
		export type Counterbalance = `${Counterbalance2.Link}-${isoly.DateTime}`
		export function split(counterbalance: Counterbalance): [Counterbalance2.Link, isoly.DateTime] {
			const split = counterbalance.split("-")
			const [supplier, account, hour] = [split[0], split[1], split.slice(2).join("-")]
			return [`${supplier}-${account}` as Counterbalance2.Link, hour]
		}
	}
	export type Entry = Balances.Balance.Entry | Entry.Counterbalance | Counterbalances.Counterbalance.Entry.Settlement
	export const type = isly.record<Changes>(isly.string(), Change.type)
	export const is = type.is
	export const flaw = type.flaw
}
