import { isoly } from "isoly"
import { isly } from "isly"

export interface Merchant {
	name: string
	id: string
	category: string
	country: isoly.CountryCode.Alpha2
	address: string
}
export namespace Merchant {
	export const type = isly.object<Merchant>({
		name: isly.string(),
		id: isly.string(),
		category: isly.string(),
		country: isly.string(),
		address: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
