import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
import { Realm } from "../../Realm"
import { Supplier } from "../../Supplier"
import { Balance } from "../Balance"
import { Transaction } from "../Transaction"
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
	rail: Rail.Address[]
	balance: Balance
}
export namespace Account {
	export const type = isly.object<Account>({
		id: isly.string(),
		created: isly.fromIs("Treasury.Account.Created", isoly.DateTime.is),
		name: isly.string(),
		realm: Realm.type,
		supplier: Supplier.type,
		reference: isly.string(),
		currencies: isly.fromIs("Treasury.Account.currencies", isoly.Currency.is).array(),
		type: AccountCategory.type,
		conditions: AccountConditions.type,
		rail: Rail.Address.type.array(),
		balance: isly.fromIs("Treasury.Account.balance", Balance.is),
	})
	export type Listable = Account & { transactions: Transaction[] }
	export import Creatable = AccountCreatable
	export import Storable = AccountStorable
	export import Fetchable = AccountFetchable
	export import Category = AccountCategory
	export import Conditions = AccountConditions
}
