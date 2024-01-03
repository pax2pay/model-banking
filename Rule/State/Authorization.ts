import { isoly } from "isoly"
import { isly } from "isly"
import { Authorization as ModelAuthorization } from "../../Authorization"

export interface Authorization extends Omit<ModelAuthorization.Creatable, "amount"> {
	time: string
	hour: number
	currency: isoly.Currency
	amount: number
}
export namespace Authorization {
	export function from(authorization: ModelAuthorization.Creatable): Authorization {
		return {
			...authorization,
			time: isoly.DateTime.getTime(isoly.DateTime.now()),
			hour: isoly.DateTime.getHour(isoly.DateTime.now()),
			currency: authorization.amount[0],
			amount: Math.abs(authorization.amount[1]),
		}
	}
	export const type = ModelAuthorization.Creatable.type.omit(["amount"]).extend<Authorization>({
		time: isly.string(),
		hour: isly.number(),
		currency: isly.string(isoly.Currency.types),
		amount: isly.number(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
