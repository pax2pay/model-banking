import { isoly } from "isoly"
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
	export function is(value: Fetchable | any): value is Fetchable {
		return (
			value &&
			typeof value == "object" &&
			typeof value.name == "string" &&
			Supplier.is(value.supplier) &&
			typeof value.reference == "string" &&
			Array.isArray(value.currencies) &&
			value.currencies.every(isoly.Currency.is) &&
			(value.type == "safeguarded" || value.type == "other") &&
			Array.isArray(value.rail) &&
			value.rail.every(Rail.is)
		)
	}
}
