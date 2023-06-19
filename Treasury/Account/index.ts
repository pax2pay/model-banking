import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { Rail } from "../../Rail"
import { Realm } from "../../Realm"
import { Supplier } from "../../Supplier"
import { Balance } from "../Balance"
import { Creatable as AccountCreatable } from "./Creatable"
import { Fetchable as AccountFetchable } from "./Fetchable"
import { Storable as AccountStorable } from "./Storable"

export interface Account {
	id: cryptly.Identifier
	created: isoly.DateTime
	name: string
	realm: Realm
	supplier: Supplier
	reference: string
	currencies: isoly.Currency[]
	type: "safeguarded" | "other" | "external"
	rail: Rail[]
	balance: Balance
}

export namespace Account {
	export function is(value: Account | any): value is Account {
		return (
			value &&
			typeof value == "object" &&
			cryptly.Identifier.is(value.id, 8) &&
			isoly.DateTime.is(value.created) &&
			typeof value.name == "string" &&
			Realm.is(value.realm) &&
			Supplier.is(value.supplier) &&
			typeof value.reference == "string" &&
			Array.isArray(value.currencies) &&
			value.currencies.every(isoly.Currency.is) &&
			(value.type == "safeguarded" || value.type == "other") &&
			Array.isArray(value.rail) &&
			value.rail.every(Rail.is)
		)
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}

	export type Creatable = AccountCreatable
	export const Creatable = AccountCreatable
	export type Storable = AccountStorable
	export const Storable = AccountStorable
	export type Fetchable = AccountFetchable
	export const Fetchable = AccountFetchable
}
