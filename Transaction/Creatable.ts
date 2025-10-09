import { isoly } from "isoly"
import { Card } from "Card"
import { isly } from "isly"
import { Account } from "../Account"
import { Rail } from "../Rail"
import { Amount } from "./Amount"
import { Exchange } from "./Exchange"

export interface Creatable {
	counterpart: string | Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
	exchange?: Exchange
}
export namespace Creatable {
	export type Resolved = (Creatable & { counterpart: Rail.Address }) | CardTransaction
	export const type = isly.object<Creatable>({
		counterpart: isly.union<string | Rail.Address, string, Rail.Address>(isly.string(), Rail.Address.type),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
		exchange: Exchange.type.optional(),
	})
	export interface CardTransaction extends Creatable {
		account: Pick<Rail.Address.Card, "id" | "type">
		accountId: string
		counterpart: Rail.Address.Card.Counterpart
		reference: { reference: string }
		approvalCode?: string
	}
	export namespace CardTransaction {
		export const type = Creatable.type.extend<CardTransaction>({
			account: Rail.Address.Card.type.pick(["id", "type"]),
			accountId: isly.string(),
			counterpart: Rail.Address.Card.Counterpart.type,
			reference: isly.object<{ reference: string }>({ reference: isly.string() }),
			approvalCode: isly.string().optional(),
		})
		export function charge(
			charges: Account.Charge[],
			creatable: CardTransaction,
			preset: Card.Preset
		): Amount.Charge[] {
			return Account.Charge.evaluate(charges, creatable, preset)
		}
	}
}
