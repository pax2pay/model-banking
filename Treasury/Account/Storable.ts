import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../../Realm"
import { Supplier } from "../../Supplier"
import { Category } from "./Category"
import { Conditions } from "./Conditions"

export interface Storable {
	code: string
	created: isoly.DateTime
	realm: Realm
	supplier: Supplier
	type: Category
	reference: string
	conditions?: Conditions
}
export namespace Storable {
	export const type = isly.object<Storable>({
		code: isly.string(),
		created: isly.fromIs("Treasury.Account.Storable", isoly.DateTime.is),
		realm: Realm.type,
		supplier: Supplier.type,
		type: Category.type,
		reference: isly.string(),
		conditions: Conditions.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
