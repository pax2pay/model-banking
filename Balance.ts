import { isly } from "isly"

export type Balance = Partial<Record<Balance.Entry, number>> & {
	available: number
	reserved: Partial<Record<Balance.Reserve, number>>
}
export namespace Balance {
	export type Reserve = typeof Reserve.values[number]
	export namespace Reserve {
		export const values = ["in", "out", "buffer"]
		export const type = isly.string<Reserve>(values)
	}
	export type Entry = typeof Entry.values[number]
	export namespace Entry {
		export const values = ["actual", "incomingReserved", "outgoingReserved"] as const
		export const type = isly.string<Entry>(values)
	}
	export const newType = isly.object<{ available: number; reserved: Record<Balance.Reserve, number> }>({
		available: isly.number(),
		reserved: isly.record<Record<Balance.Reserve, number>>(Balance.Reserve.type, isly.number()),
	})
	export const type = isly.intersection(isly.record<Balance>(Entry.type, isly.number()), newType)
	// export function add(addendee: Balance, addend: Balance, currency: isoly.Currency): Balance {
	// 	return (Object.entries(addend) as [Entry, number][]).reduce(
	// 		(r: Balance, [entry, amount]) => ({
	// 			...r,
	// 			[entry]: isoly.Currency.add(currency, addendee[entry] ?? 0, amount),
	// 		}),
	// 		addendee
	// 	)
	// }
}
