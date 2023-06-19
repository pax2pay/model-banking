import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../../Realm"
import { Supplier } from "../../Supplier"

export interface Storable {
	id: cryptly.Identifier
	created: isoly.DateTime
	realm: Realm
	supplier: Supplier
	reference: string
}

export namespace Storable {
	export const type = isly.object<Storable>({
		id: isly.string(),
		created: isly.fromIs("Treasury.Account.Storable", isoly.DateTime.is),
		realm: isly.fromIs("realm", Realm.is),
		supplier: isly.fromIs("supplier", Supplier.is),
		reference: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
