import { isoly } from "isoly"
import { isly } from "isly"
import { Balances } from "../Balances"
import { Counterbalance as CounterbalanceOperation } from "../Counterbalance"
import { Change } from "./Change"

export type Changes = Partial<Record<Balances.Balance.Entry, Change>> & Record<Changes.Entry.Counterbalance, Change>

export namespace Changes {
	export namespace Entry {
		type Settlement = string // Settlement.id
		type Snapshot = string // 2024-09-04T05Z isoly date time truncated on hour
		export type Counterbalance =
			| `${Snapshot}-${CounterbalanceOperation.Link}`
			| `${Settlement}-${"net" | "fee" | "charge"}`
		export function split(counterbalance: Counterbalance): [CounterbalanceOperation.Link, isoly.DateTime] {
			const split = counterbalance.split("-")
			const [realm, supplier, account, hour] = [split[0], split[1], split[2], split.slice(3).join("-")]
			return [`${realm}-${supplier}-${account}`, hour]
		}
	}
	export type Entry = Balances.Balance.Entry | Entry.Counterbalance
	export const type = isly.record<Changes>(isly.string(), Change.type)
	export const is = type.is
	export const flaw = type.flaw
}
