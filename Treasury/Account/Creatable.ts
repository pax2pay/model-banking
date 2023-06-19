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
	export const type = isly.object<Creatable>({
		name: isly.string(),
		realm: isly.fromIs("realm", Realm.is),
		supplier: isly.fromIs("supplier", Supplier.is),
		currencies: isly.fromIs("Account.Creatable.currencies", isoly.Currency.is).array(),
		type: isly.string(["safeguarded", "other", "external"]),
	})
	export const is = type.is
	export const flaw = type.flaw
}
