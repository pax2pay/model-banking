import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
import { Realm } from "../../Realm"
import { Supplier } from "../../Supplier"
import { Balance } from "../Balance"
import { Category as AccountCategory } from "./Category"
import { Conditions as AccountConditions } from "./Conditions"
import { Creatable as AccountCreatable } from "./Creatable"
import { Fetchable as AccountFetchable } from "./Fetchable"
import { Storable as AccountStorable } from "./Storable"

export interface Account {
	id: cryptly.Identifier
	created: isoly.DateTime
	name: string
	realm: Realm
	supplier: Supplier | "external"
	reference: string
	currencies: isoly.Currency[]
	type: AccountCategory
	conditions?: { minimum?: Balance }
	rail: Rail[]
	balance: Balance
}

export namespace Account {
	export const type = isly.object<Account>({
		id: isly.string(),
		created: isly.fromIs("Treasury.Account.Created", isoly.DateTime.is),
		name: isly.string(),
		realm: isly.fromIs("realm", Realm.is),
		supplier: isly.fromIs("supplier", Supplier.is),
		reference: isly.string(),
		currencies: isly.fromIs("Treasury.Account.currencies", isoly.Currency.is).array(),
		type: isly.string(AccountCategory.type),
		conditions: AccountConditions.type,
		rail: isly.fromIs("Treasury.Account.rail", Rail.is).array(),
		balance: isly.fromIs("Treasury.Account.balance", Balance.is),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}

	export type Creatable = AccountCreatable
	export const Creatable = AccountCreatable
	export type Storable = AccountStorable
	export const Storable = AccountStorable
	export type Fetchable = AccountFetchable
	export const Fetchable = AccountFetchable
	export type Category = AccountCategory
	export const Category = AccountCategory
	export type Conditions = AccountConditions
	export const Conditions = AccountConditions
}
