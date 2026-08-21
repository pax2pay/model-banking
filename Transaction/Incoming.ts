import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
import { zod } from "../zod"
import { Reference as TransactionReference } from "./Reference"

export interface Incoming {
	account: Rail.Address
	counterpart: Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
	posted: string
	rail?: Rail
	reference?: TransactionReference
}
export namespace Incoming {
	export const type = isly.object<Incoming>({
		account: Rail.Address.type,
		counterpart: Rail.Address.type,
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
		posted: isly.string(),
		rail: Rail.type.optional(),
		reference: TransactionReference.type.optional(),
	})
	export const typeZod = zod.object({
		account: Rail.Address.typeZod,
		counterpart: Rail.Address.typeZod,
		currency: zod.enum(isoly.Currency.values),
		amount: zod.number(),
		description: zod.string(),
		posted: zod.string(),
		rail: Rail.typeZod.optional(),
		reference: TransactionReference.typeZod.optional(),
	})
}
