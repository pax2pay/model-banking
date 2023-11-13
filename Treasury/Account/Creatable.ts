import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../../Realm"
import { Supplier } from "../../Supplier"
import { Category } from "./Category"
import { Conditions } from "./Conditions"

export interface Creatable {
	name: string
	realm: Realm
	supplier: Supplier
	currencies: isoly.Currency[]
	type: Category
	conditions?: Conditions
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		name: isly.string(),
		realm: isly.fromIs("realm", Realm.is),
		supplier: isly.fromIs("supplier", Supplier.is),
		currencies: isly.fromIs("Account.Creatable.currencies", isoly.Currency.is).array(),
		type: isly.string(Category.type),
		conditions: Conditions.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
