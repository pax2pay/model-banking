import { isoly } from "isoly"
import { isly } from "isly"

export interface Merchant {
	name: string
	id: string
	category: string
	address: string
	city: string
	zip: string
	state?: string
	country: isoly.CountryCode.Alpha2
}
export namespace Merchant {
	export const type = isly.object<Merchant>({
		name: isly.string(),
		id: isly.string(),
		category: isly.string(),
		address: isly.string(),
		city: isly.string(),
		zip: isly.string(),
		state: isly.string().optional(),
		country: isly.string(),
	})
}
