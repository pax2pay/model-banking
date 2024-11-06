import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"

export interface Creatable {
	counterpart: string | Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
}
export namespace Creatable {
	export type Resolved = Creatable & { counterpart: Rail.Address }
	export const type = isly.object<Creatable>({
		counterpart: isly.union<string | Rail.Address, string, Rail.Address>(isly.string(), Rail.Address.type),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export const get = type.get
}
