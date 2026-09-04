import { isoly } from "isoly"
import { isly } from "isly"
import { Warning } from "../../Warning"
import { zod } from "../../zod"
import { Transaction } from "../Transaction"

export interface Account {
	code: string
	label: string
	reference: string
	description?: string
	currency: isoly.Currency
	opening?: Account.Opening
	closing: Account.Closing
	delta: Account.Delta
	warnings?: Warning.Snapshot[]
}
export namespace Account {
	export type Opening = { at: isoly.DateTime; balance: number }
	export namespace Opening {
		export const type = isly.object<Opening>({ at: isly.string(), balance: isly.number() })
		export const typeZod: zod.ZodType<Opening> = zod.object({ at: zod.string(), balance: zod.number() })
	}
	export type Closing = Opening
	export namespace Closing {
		export const type = Opening.type
		export const typeZod = Opening.typeZod
	}
	export type Delta = { amount: number; transactions: Transaction[] }
	export namespace Delta {
		export const type = isly.object<Delta>({ amount: isly.number(), transactions: Transaction.type.array() })
		export const typeZod: zod.ZodType<Delta> = zod.object({
			amount: zod.number(),
			transactions: zod.array(Transaction.typeZod),
		})
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
		warnings: Warning.Snapshot.type.array().optional(),
	})
	export const typeZod: zod.ZodType<Account> = zod.object({
		code: zod.string(),
		label: zod.string(),
		reference: zod.string(),
		description: zod.string().optional(),
		currency: zod.enum(isoly.Currency.values),
		opening: Opening.typeZod.optional(),
		closing: Closing.typeZod,
		delta: Delta.typeZod,
		warnings: zod.array(Warning.Snapshot.typeZod).optional(),
	})
}
