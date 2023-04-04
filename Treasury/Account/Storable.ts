import * as cryptly from "cryptly"
import * as isoly from "isoly"
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
	export function is(value: Storable | any): value is Storable {
		return (
			value &&
			typeof value == "object" &&
			cryptly.Identifier.is(value.id, 8) &&
			isoly.DateTime.is(value.created) &&
			Realm.is(value.realm) &&
			Supplier.is(value.supplier) &&
			typeof value.reference == "string"
		)
	}
}
