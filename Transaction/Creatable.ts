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
	export type Card = Creatable & {
		counterpart: Rail.Address.Card.Counterpart
	}
	export namespace Card {
		export const type = Creatable.type.omit<"counterpart">(["counterpart"]).extend<Card>({
			counterpart: Rail.Address.Card.Counterpart.type,
		})
	}
}
