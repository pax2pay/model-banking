import * as isoly from "isoly"
import { Rail } from "../Rail"
import { Creatable as TransactionCreatable } from "./Creatable"

export interface Incoming extends TransactionCreatable {
	account: Rail
	counterpart: Rail
	currency: isoly.Currency
	amount: number
	reference?: string
	posted: isoly.DateTime
	description: string
}

export namespace Incoming {
	export function is(value: any | Incoming): value is Incoming {
		return (
			value &&
			typeof value == "object" &&
			Rail.is(value.account) &&
			Rail.is(value.counterpart) &&
			isoly.Currency.is(value.currency) &&
			typeof value.amount == "number" &&
			(value.reference == "undefined" || typeof value.reference == "string") &&
			isoly.DateTime.is(value.posted) &&
			typeof value.description == "string"
		)
	}
}
