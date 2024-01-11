import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
import { Supplier } from "../../Supplier"
import { Balance } from "../Balance"
import { Category } from "./Category"

export interface Fetchable {
	name: string
	supplier: Supplier
	reference: string
	currencies: isoly.Currency[]
	type: Category
	rail: Rail.Address[]
	balance: Balance
}

export namespace Fetchable {
	export const type = isly.object<Fetchable>({
		name: isly.string(),
		supplier: isly.fromIs("supplier", Supplier.is),
		reference: isly.string(),
		currencies: isly.fromIs("Account.Fetchable.currencies", isoly.Currency.is).array(),
		type: Category.type,
		rail: isly.fromIs("Account.Fetchable.rail", Rail.Address.is).array(),
		balance: isly.fromIs("Account.Fetchable.rail", Balance.is),
	})
	export const is = type.is
	export const flaw = type.flaw
}
