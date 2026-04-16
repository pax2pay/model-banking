import { isoly } from "isoly"
import { isly } from "isly"
import { Transaction } from "../Transaction"

export interface Account {
	code: string
	label: string
	reference: string
	description?: string
	currency: isoly.Currency
	opening: Account.Opening
	closing: Account.Closing
	delta: Account.Delta
}
export namespace Account {
	export type Opening = { at: isoly.DateTime; balance: number }
	export namespace Opening {
		export const type = isly.object<Opening>({ at: isly.string(), balance: isly.number() })
	}
	export type Closing = Opening
	export namespace Closing {
		export const type = Opening.type
	}
	export type Delta = { amount: number; transactions: Transaction[] }
	export namespace Delta {
		export const type = isly.object<Delta>({ amount: isly.number(), transactions: Transaction.type.array() })
	}
	export const type = isly.object<Account>({
		code: isly.string(),
		label: isly.string(),
		reference: isly.string(),
		description: isly.string().optional(),
		currency: isly.string(),
		opening: Opening.type,
		closing: Closing.type,
		delta: Delta.type,
	})
}
