import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "./Amount"

export type Balance = { available?: number; reserved?: Balance.Reserved }
export namespace Balance {
	export type Reserve = typeof Reserve.values[number]
	export namespace Reserve {
		export const values = ["incoming", "outgoing", "buffer"] as const
		export const type = isly.string<Reserve>(values)
	}
	export type Reserved = Partial<Record<Balance.Reserve, number>>
	export const type = isly.object<Balance>({
		available: isly.number().optional(),
		reserved: isly.record<Reserved>(Balance.Reserve.type, isly.number().optional()).optional(),
	})
	export type Legacy = Partial<Record<Legacy.Entry, number>>
	export namespace Legacy {
		export type Entry = typeof Entry.values[number]
		export namespace Entry {
			export const values = ["actual", "incomingReserved", "outgoingReserved", "bufferReserved"] as const
			export const type = isly.string<Entry>(values)
		}
		export const type = isly.record<Legacy>(Entry.type, isly.number())
	}
	export type MaybeLegacy = Balance | Legacy
	export namespace MaybeLegacy {
		export const legacyType = isly.union<MaybeLegacy>(type, Legacy.type)
	}
	export type Extended = Balance & Legacy
	export const Extended = isly.intersection<Extended, Balance, Legacy>(type, Legacy.type)
	export function update(currency: isoly.Currency, balance: MaybeLegacy): Extended {
		const result: Extended = { ...balance }
		if (Legacy.type.is(balance)) {
			const reserved = isoly.Currency.add(
				currency,
				balance.incomingReserved ?? 0,
				isoly.Currency.add(currency, balance.outgoingReserved ?? 0, balance.bufferReserved ?? 0)
			)
			result.reserved = {
				incoming: balance.incomingReserved,
				outgoing: balance.outgoingReserved,
				buffer: balance.bufferReserved,
			}
			result.available = isoly.Currency.subtract(currency, balance.actual ?? 0, reserved)
		} else {
			result.actual = computeActual(currency, balance)[1]
			result.incomingReserved = balance.reserved?.incoming
			result.outgoingReserved = balance.reserved?.outgoing
			result.bufferReserved = balance.reserved?.buffer
		}
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
	export function add(addendee: Extended, addend: Extended, currency: isoly.Currency): Extended {
		const updated = [update(currency, addendee), update(currency, addend)]
		return update(currency, {
			available: isoly.Currency.add(currency, updated[0].available ?? 0, updated[1].available ?? 0),
			reserved: {
				buffer: isoly.Currency.add(currency, updated[0].reserved?.buffer ?? 0, updated[1].reserved?.buffer ?? 0),
				incoming: isoly.Currency.add(currency, updated[0].reserved?.incoming ?? 0, updated[1].reserved?.incoming ?? 0),
				outgoing: isoly.Currency.add(currency, updated[0].reserved?.outgoing ?? 0, updated[1].reserved?.outgoing ?? 0),
			},
		})
	}
}
