import * as isoly from "isoly"
import { Operation } from "../Operation"
import { Rail } from "../Rail"

export interface Creatable {
	account: Rail
	counterpart: Rail
	currency: isoly.Currency
	amount: number
	description?: string
	operations?: Operation.Creatable[]
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			Rail.is(value.account) &&
			Rail.is(value.counterpart) &&
			isoly.Currency.is(value.currency) &&
			typeof value.amount == "number" &&
			value.amount > 0 &&
			(value.description == undefined || typeof value.description == "string") &&
			(value.operations == undefined ||
				(Array.isArray(value.operations) && value.operations.every(Operation.Creatable.is)))
		)
	}
}
