import * as cryptly from "cryptly"
import * as isoly from "isoly"
import { Rail } from "../../Rail"
import { Balance } from "../Balance"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account extends Account.Creatable {
	id: cryptly.Identifier
	created: isoly.DateTime
	reference: string
	rail: Rail[]
	balance: Balance
}

export namespace Account {
	export function is(value: Account | any): value is Account {
		return (
			Creatable.is({ ...value }) &&
			cryptly.Identifier.is(value.id, 8) &&
			isoly.DateTime.is(value.created) &&
			typeof value.reference == "string" &&
			Array.isArray(value.rail) &&
			value.rail.every(Rail.is)
		)
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}

	export type Creatable = AccountCreatable
	export const Creatable = AccountCreatable
}
