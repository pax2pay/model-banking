import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
import { Exchange } from "../Exchange"

export interface Base {
	type: "outgoing" | "incoming" | "authorization"
	counterpart: Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
	exchange?: Exchange
}
export namespace Base {
	export const type = isly.object<Base>({
		type: isly.string(["outgoing", "incoming", "authorization"]),
		counterpart: Rail.Address.type,
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
		exchange: Exchange.type.optional(),
	})
}
