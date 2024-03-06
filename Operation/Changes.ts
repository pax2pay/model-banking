import { isoly } from "isoly"
import { isly } from "isly"
import { Balances } from "../Balances"
import { Counterbalance2 } from "../Counterbalance2"
import { Counterbalances } from "../CounterBalances"
import { Change } from "./Change"

// TODO: remove old counterbalances
export type Changes = Partial<Record<Balances.Balance.Entry, Change>> &
	Record<Counterbalances.Counterbalance.Entry.Settlement | Changes.Entry.Counterbalance, Change>

export namespace Changes {
	export namespace Entry {
		export type Counterbalance = `${Counterbalance2.Link}-${isoly.DateTime}`
		export const Counterbalance = isly.fromIs<Counterbalance>(
			"Changes.Entry.Counterbalance",
			(value: any | Counterbalance) => {
				const result = !value ? false : typeof value == "string" && value.split("-")
				return (
					result && Counterbalance2.Link.is(`${result[0]}-${result[1]}`) && isoly.DateTime.is(result.slice(2).join("-"))
				)
			}
		)
		export function split(counterbalance: Counterbalance): [Counterbalance2.Link, isoly.DateTime] {
			const split = counterbalance.split("-")
			const [supplier, account, hour] = [split[0], split[1], split.slice(2).join("-")]
			return [`${supplier}-${account}` as Counterbalance2.Link, hour]
		}
	}
	export type Entry = Balances.Balance.Entry | Entry.Counterbalance | Counterbalances.Counterbalance.Entry.Settlement
	export const type = isly.record<Changes>(
		isly.union<Entry, Balances.Balance.Entry, Entry.Counterbalance, Counterbalances.Counterbalance.Entry>(
			Balances.Balance.Entry.type,
			Entry.Counterbalance,
			Counterbalances.Counterbalance.Entry.type
		),
		Change.type
	)
	export const is = type.is
	export const flaw = type.flaw
}
