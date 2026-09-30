import { isoly } from "isoly"
import { isly } from "isly"
import { Account } from "../Account"
import { Preset } from "../Card/Preset"
import { Rail } from "../Rail"
import { zod, zodHelper } from "../zod"
import { Amount } from "./Amount"
import { Exchange } from "./Exchange"

export interface Creatable {
	counterpart: Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
	exchange?: Exchange
	reference?: { reference?: string }
}
export namespace Creatable {
	export type Resolved = Creatable | CardTransaction
	export const type = isly.object<Creatable>({
		counterpart: Rail.Address.type,
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
		exchange: Exchange.type.optional(),
		reference: isly.object<{ reference?: string }>({ reference: isly.string().optional() }).optional(),
	})
	export const typeZod = zod
		.object({
			counterpart: Rail.Address.typeZod,
			currency: zodHelper.currency,
			amount: zod.number(),
			description: zod.string(),
			exchange: Exchange.typeZod.optional(),
			reference: zod.object({ reference: zod.string().optional() }).optional(),
		})
		.meta({ id: "Transaction.Creatable" })
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
		export const typeZod = Creatable.typeZod
			.extend({
				account: Rail.Address.Card.typeZod.pick({ id: true, type: true }),
				accountId: zod.string(),
				counterpart: Rail.Address.Card.Counterpart.typeZod,
				reference: zod.object({ reference: zod.string() }),
				approvalCode: zod.string().optional(),
			})
			.meta({ id: "Transaction.Creatable.CardTransaction" })
		export function charge(creatable: CardTransaction, preset: Preset, charges?: Account.Charge): Amount.Charge {
			return Account.Charge.evaluate(
				creatable.counterpart,
				creatable.currency,
				creatable.amount,
				preset,
				charges,
				creatable.exchange
			)
		}
	}
}
