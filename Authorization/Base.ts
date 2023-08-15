import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Merchant } from "../Merchant"
import { Creatable } from "./Creatable"

export type Base = {
	id: cryptly.Identifier
	card: string
	created: isoly.DateTime
	amount: [isoly.Currency, number]
	merchant: Merchant
	acquirer: Acquirer
	reference: string
	description: string
}
export namespace Base {
	export function fromCreatable(authorization: Creatable): Base {
		return {
			id: cryptly.Identifier.generate(8),
			card: authorization.card,
			created: isoly.DateTime.now(),
			amount: authorization.amount,
			merchant: authorization.merchant,
			acquirer: authorization.acquirer,
			reference: authorization.reference,
			description: authorization.description,
		}
	}
	export const type = isly.object<Base>({
		id: isly.fromIs("Authorization.id", cryptly.Identifier.is),
		card: isly.string(),
		created: isly.fromIs("Authorization.created", isoly.DateTime.is),
		amount: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		merchant: Merchant.type,
		acquirer: Acquirer.type,
		reference: isly.string(),
		description: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
