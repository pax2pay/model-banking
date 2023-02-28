import * as isoly from "isoly"
import { Rail } from "../Rail"
import { Creatable as TransactionCreatable } from "./Creatable"

export interface Incoming extends TransactionCreatable {
	account: Rail
	counterpart: Rail
	currency: isoly.Currency
	amount: number
	// some sort of timestamp
	description?: string
}

export namespace Incoming {
	export function is(value: any | Incoming): value is Incoming {
		return (
			typeof value == "object" &&
			Rail.is(value.account) &&
			Rail.is(value.counterpart) &&
			!Rail.hasSameIdentifiers(value.account, value.counterpart) &&
			isoly.Currency.is(value.currency) &&
			typeof value.amount == "number" &&
			(value.description == undefined || typeof value.description == "string")
		)
	}
}
