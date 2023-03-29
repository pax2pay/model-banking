import * as cryptly from "cryptly"
import * as isoly from "isoly"
import { Rail } from "../../Rail"
import { Balance } from "../Balance"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account extends Account.Creatable {
	readonly id: cryptly.Identifier
	readonly created: isoly.DateTime
	readonly reference: string
	rail: Rail
	balance: Balance
}

export namespace Account {
	export function is(value: Account | any): value is Account {
		return (
			Creatable.is({ ...value }) &&
			cryptly.Identifier.is(value.id, 8) &&
			isoly.DateTime.is(value.created) &&
			typeof value.reference == "string" &&
			Rail.is(value.rail)
		)
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}

	export type Creatable = AccountCreatable
	export const Creatable = AccountCreatable
}
