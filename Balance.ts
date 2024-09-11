import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "./Amount"

export type Balance = Balance.Legacy & { available?: number; reserved?: Balance.Reserved }
export namespace Balance {
	export type Legacy = Partial<Record<Balance.Entry, number>>
	export type Reserve = typeof Reserve.values[number]
	export namespace Reserve {
		export const values = ["in", "out", "buffer"] as const
		export const type = isly.string<Reserve>(values)
	}
	export type Reserved = Partial<Record<Balance.Reserve, number>>
	export type Entry = typeof Entry.values[number]
	export namespace Entry {
		export const values = ["actual", "incomingReserved", "outgoingReserved", "bufferReserved"] as const
		export const type = isly.string<Entry>(values)
	}
	export const newType = isly.object<{ available?: number; reserved?: Reserved }>({
		available: isly.number().optional(),
		reserved: isly.record<Record<Balance.Reserve, number>>(Balance.Reserve.type, isly.number()).optional(),
	})
	export const type = isly.intersection(isly.record<Balance>(Entry.type, isly.number()), newType)
	export function fromLegacy(currency: isoly.Currency, balance: Balance): Balance {
		const result: Balance = {
			actual: balance.actual,
			incomingReserved: balance.incomingReserved,
			outgoingReserved: balance.outgoingReserved,
			bufferReserved: balance.bufferReserved,
		}
		if (typeof balance.available == "undefined") {
			const reserved = isoly.Currency.add(currency, balance.incomingReserved ?? 0, balance.outgoingReserved ?? 0)
			result.available = isoly.Currency.subtract(currency, balance.actual ?? 0, reserved)
		} else
			result.available = balance.available
		if (typeof balance.reserved == "undefined")
			result.reserved = { in: balance.incomingReserved, out: balance.outgoingReserved, buffer: balance.bufferReserved }
		else
			result.reserved = balance.reserved
		return result
	}
	export function computeReserved(currency: isoly.Currency, balance: Balance): Amount {
		return [
			currency,
			Object.entries(balance.reserved ?? {}).reduce(
				(result, [_, current]) => isoly.Currency.add(currency, result, current ?? 0),
				0
			),
		]
	}
	export function computeActual(currency: isoly.Currency, balance: Balance): Amount {
		const reserved = computeReserved(currency, balance)[1]
		return [currency, isoly.Currency.add(currency, balance.available ?? 0, reserved)]
	}
}
