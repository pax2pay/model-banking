import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
import { Exchange } from "./Exchange"

export interface Creatable {
	counterpart: string | Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
}
export namespace Creatable {
	export type Resolved = Creatable & { counterpart: Rail.Address; exchange?: Exchange }
	export const type = isly.object<Creatable>({
		counterpart: isly.union<string | Rail.Address, string, Rail.Address>(isly.string(), Rail.Address.type),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
	})
	export type Card = Resolved & {
		counterpart: Rail.Address.Card.Counterpart
		authorization: Card.Authorization
	}
	export namespace Card {
		export interface Authorization {
			card: string
			reference: string
			approvalCode?: string
		}
		export namespace Authorization {
			export const type = isly.object<Authorization>({
				card: isly.string(),
				reference: isly.string(),
				approvalCode: isly.string().optional(),
			})
		}
		export const type = Creatable.type.omit<"counterpart">(["counterpart"]).extend<Card>({
			counterpart: Rail.Address.Card.Counterpart.type,
			authorization: Authorization.type,
			exchange: Exchange.type.optional(),
		})
	}
}
