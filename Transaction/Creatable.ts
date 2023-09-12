import { isoly } from "isoly"
import { isly } from "isly"
import { Operation } from "../Operation"
import { Rail } from "../Rail"

export interface Creatable {
	counterpart: Rail
	currency: isoly.Currency
	amount: number
	description: string
	operations?: Operation.Creatable[]
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		counterpart: isly.fromIs("Rail", Rail.is),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
		operations: isly.array(isly.fromIs("Operation.Creatable", Operation.Creatable.is)).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export const get = type.get
}
