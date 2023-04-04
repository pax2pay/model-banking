import * as isoly from "isoly"
import { Realm } from "../../Realm"
import { Supplier } from "../../Supplier"

export interface Creatable {
	name: string
	realm: Realm
	supplier: Supplier
	currencies: isoly.Currency[]
	type: "safeguarded" | "other"
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return (
			value &&
			typeof value == "object" &&
			typeof value.name == "string" &&
			Realm.is(value.realm) &&
			Supplier.is(value.supplier) &&
			Array.isArray(value.currencies) &&
			value.currencies.every(isoly.Currency.is) &&
			(value.type == "safeguarded" || value.type == "other")
		)
	}
}
