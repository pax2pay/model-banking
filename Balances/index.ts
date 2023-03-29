import * as isoly from "isoly"
import { BalanceEntries, BalanceEntry } from "./type"

export type Balances = Partial<Record<isoly.Currency, Partial<Record<BalanceEntry, number>>>>

export namespace Balances {
	export const entries: BalanceEntry[] = [...BalanceEntries]
	export function is(value: Balances | any): value is Balances {
		return (
			typeof value == "object" &&
			Object.entries(value).every(
				([k, v]) =>
					isoly.Currency.is(k) &&
					typeof v == "object" &&
					Object.entries(v as Record<string, unknown>).every(
						([kInner, vInner]) => BalanceEntry.is(kInner) && typeof vInner == "number"
					)
			)
		)
	}
	export type Entry = BalanceEntry
	export const Entry = BalanceEntry
}
