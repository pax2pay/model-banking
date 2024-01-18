import { isoly } from "isoly"
import { isly } from "isly"
import { Creatable as AuthorizationCreatable } from "../../Authorization/Creatable"

export interface Authorization extends Omit<AuthorizationCreatable, "amount"> {
	time: string
	hour: number
	currency: isoly.Currency
	amount: number
}
export namespace Authorization {
	export function from(authorization: AuthorizationCreatable): Authorization {
		return {
			...authorization,
			time: isoly.DateTime.getTime(isoly.DateTime.now()),
			hour: isoly.DateTime.getHour(isoly.DateTime.now()),
			currency: authorization.amount[0],
			amount: Math.abs(authorization.amount[1]),
		}
	}
	export const type = AuthorizationCreatable.type.omit(["amount"]).extend<Authorization>({
		time: isly.string(),
		hour: isly.number(),
		currency: isly.string(isoly.Currency.types),
		amount: isly.number(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
