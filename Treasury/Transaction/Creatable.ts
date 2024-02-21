import { isoly } from "isoly"
import { Rail } from "../../Rail"

export interface Creatable {
	creditor: Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return (
			value &&
			typeof value == "object" &&
			value.creditor &&
			Rail.Address.is(value.creditor) &&
			isoly.Currency.is(value.currency) &&
			typeof value.amount == "number" &&
			typeof value.description == "string"
		)
	}
}
