import { isoly } from "isoly"
import { isly } from "isly"

export type Amount = {
	net: number
	fee: {
		other: number
	}
	charge: number
}
export namespace Amount {
	export const type = isly.object<Amount>({
		net: isly.number(),
		fee: isly.object<Amount["fee"]>({ other: isly.number() }),
		charge: isly.number(),
	})
	export function add(currency: isoly.Currency, addendee: Amount, addend: Partial<Amount>): Amount {
		const result = { ...addendee }
		result.net = isoly.Currency.add(currency, result.net, addend.net ?? 0)
		result.fee.other = isoly.Currency.add(currency, result.fee.other, addend.fee?.other ?? 0)
		return result
	}
	export function create(): Amount {
		return { net: 0, charge: 0, fee: { other: 0 } }
	}
}
