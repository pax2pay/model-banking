import * as isoly from "isoly"

export type Balances = Partial<Record<isoly.Currency, Partial<Record<Balances.Entry, number>>>>

export namespace Balances {
	export function is(value: Balances | any): value is Balances {
		return (
			typeof value == "object" &&
			Object.entries(value).every(
				([k, v]) =>
					isoly.Currency.is(k) &&
					typeof v == "object" &&
					Object.entries(v as Record<string, unknown>).every(
						([kInner, vInner]) => Balances.Entry.is(kInner) && typeof vInner == "number"
					)
			)
		)
	}
	export type Entry = "actual" | "reserved"
	export namespace Entry {
		export function is(value: any | Entry): value is Entry {
			return typeof value == "string" && (value == "actual" || value == "reserved")
		}
	}
}
