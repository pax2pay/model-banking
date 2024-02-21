import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../../Realm"
import { Supplier } from "../../Supplier"
import { Category } from "./Category"
import { Conditions } from "./Conditions"

export interface Storable {
	id: cryptly.Identifier
	created: isoly.DateTime
	realm: Realm
	supplier: Supplier
	type: Category
	reference: string
	conditions?: Conditions
}

export namespace Storable {
	export const type = isly.object<Storable>({
		id: isly.string(),
		created: isly.fromIs("Treasury.Account.Storable", isoly.DateTime.is),
		realm: isly.fromIs("realm", Realm.is),
		supplier: isly.fromIs("supplier", Supplier.is),
		type: Category.type,
		reference: isly.string(),
		conditions: Conditions.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
