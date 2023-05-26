import { isoly } from "isoly"
import { Rail } from "../Rail"
import { Creatable as TransactionCreatable } from "./Creatable"
import { Reference as TransactionReference } from "./Reference"

export interface Incoming extends TransactionCreatable {
	account: Rail
	counterpart: Rail
	currency: isoly.Currency
	amount: number
	reference?: TransactionReference
	posted: string
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
			typeof value.posted == "string" &&
			typeof value.description == "string"
		)
	}
}
