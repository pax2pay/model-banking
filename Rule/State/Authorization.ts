import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../../Acquirer"
import { Authorization as ModelAuthorization } from "../../Authorization"
import { Merchant } from "../../Merchant"

export interface Authorization extends Omit<ModelAuthorization.Creatable, "amount"> {
	time: string
	currency: isoly.Currency
	amount: number
	original: { currency: isoly.Currency; amount: number }
}
export namespace Authorization {
	export function from(authorization: ModelAuthorization.Creatable): Authorization {
		return {
			...authorization,
			time: isoly.DateTime.getTime(isoly.DateTime.now()),
			currency: authorization.amount[0],
			amount: Math.abs(authorization.amount[1]),
			original: { currency: authorization.amount[0], amount: Math.abs(authorization.amount[1]) },
		}
	}
	// isly.object().omit(): coming soon!!
	export const type = isly.object<Authorization>({
		acquirer: Acquirer.type,
		reference: isly.string(),
		card: isly.string(),
		merchant: Merchant.type,
		description: isly.string(),
		amount: isly.number(),
		currency: isly.string(isoly.Currency.types),
		original: isly.object<Authorization["original"]>({
			currency: isly.string(isoly.Currency.types),
			amount: isly.number(),
		}),
		time: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
