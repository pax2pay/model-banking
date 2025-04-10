import { isoly } from "isoly"
import { Rail } from "../Rail"

export interface Creatable {
	amount: number
	currency: isoly.Currency
	counterpart: Rail.Address
	description: string
	by?: string
}
export namespace Creatable {}
