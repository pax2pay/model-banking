import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
import { Exchange } from "./Exchange"

export interface Creatable {
	counterpart: string | Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
	exchange?: Exchange
}
export namespace Creatable {
	export type Resolved = Creatable & { counterpart: Rail.Address }
	export const type = isly.object<Creatable>({
		counterpart: isly.union<string | Rail.Address, string, Rail.Address>(isly.string(), Rail.Address.type),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
		exchange: Exchange.type.optional(),
	})
}
