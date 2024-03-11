import { isoly } from "isoly"

export interface Funding {
	id: string
	reference: string
	created: isoly.DateTime
	link: string
	currency: isoly.Currency
	amount: number
}
