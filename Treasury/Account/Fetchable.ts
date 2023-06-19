import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
import { Supplier } from "../../Supplier"
import { Balance } from "../Balance"

export interface Fetchable {
	name: string
	supplier: Supplier
	reference: string
	currencies: isoly.Currency[]
	type: "safeguarded" | "other" | "external"
	rail: Rail[]
	balance: Balance
}

export namespace Fetchable {
	export const type = isly.object<Fetchable>({
		name: isly.string(),
		supplier: isly.fromIs("supplier", Supplier.is),
		reference: isly.string(),
		currencies: isly.fromIs("Account.Fetchable.currencies", isoly.Currency.is).array(),
		type: isly.string(["safeguarded", "other", "external"]),
		rail: isly.fromIs("Account.Fetchable.rail", Rail.is).array(),
		balance: isly.fromIs("Account.Fetchable.rail", Balance.is),
	})
	export const is = type.is
	export const flaw = type.flaw
}
