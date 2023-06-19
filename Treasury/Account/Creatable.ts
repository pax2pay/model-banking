import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../../Realm"
import { Supplier } from "../../Supplier"

export interface Creatable {
	name: string
	realm: Realm
	supplier: Supplier
	currencies: isoly.Currency[]
	type: "safeguarded" | "other" | "external"
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
	export const type = isly.object<Creatable>({
		name: isly.string(),
		realm: isly.fromIs("realm", Realm.is),
		supplier: isly.fromIs("supplier", Supplier.is),
		currencies: isly.fromIs("Account.Creatable.currencies", isoly.Currency.is).array(),
		type: isly.string(["safeguarded", "other", "external"]),
	})
}
