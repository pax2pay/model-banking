import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"

export interface Creatable {
	creditor: Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
	external?: string
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		creditor: Rail.Address.type,
		currency: isly.fromIs("transaction.currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
		external: isly.string().optional(),
	})
}
