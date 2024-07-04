import { isoly } from "isoly"
import { isly } from "isly"
import { Creatable as AuthorizationCreatable } from "../../Authorization/Creatable"
import { Merchant } from "../../Merchant"
import type { Rail } from "../../Rail"
import type { Transaction } from "../../Transaction"

export interface Authorization extends Omit<AuthorizationCreatable, "amount"> {
	time: string
	hour: number
	currency: isoly.Currency
	amount: number
	merchant: Merchant & { reference: string }
}
export namespace Authorization {
	export function from(authorization: AuthorizationCreatable): Authorization {
		return {
			...authorization,
			time: isoly.DateTime.getTime(isoly.DateTime.now()),
			hour: isoly.DateTime.getHour(isoly.DateTime.now()),
			currency: authorization.amount[0],
			amount: Math.abs(authorization.amount[1]),
			merchant: { ...authorization.merchant, reference: `${authorization.acquirer.id}-${authorization.merchant.id}` },
		}
	}
	export function toTransaction(authorization: Authorization): Transaction.Creatable & {
		counterpart: Rail.Address.Card.Counterpart
	} {
		return {
			amount: authorization.amount,
			currency: authorization.currency,
			description: authorization.description,
			counterpart: {
				type: "card",
				merchant: authorization.merchant,
				acquirer: authorization.acquirer,
			},
		}
	}
	export const type = AuthorizationCreatable.type.omit(["amount"]).extend<Authorization>({
		time: isly.string(),
		hour: isly.number(),
		currency: isly.string(isoly.Currency.types),
		amount: isly.number(),
		merchant: isly.intersection<Authorization["merchant"], Merchant, { reference: string }>(
			Merchant.type,
			isly.object<{ reference: string }>({ reference: isly.string() })
		),
	})
	export const is = type.is
	export const flaw = type.flaw
}
