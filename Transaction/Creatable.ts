import { isoly } from "isoly"
// import { isly } from "isly"
import { Rail } from "../Rail"

export interface Creatable {
	counterpart: Rail.Address
	currency: isoly.Currency
	direction?: Creatable.Direction // required for funding, "outbound" | undefined for others
	amount: number
	description: string
}
export namespace Creatable {
	export const directions = ["inbound", "outbound"] as const
	export type Direction = typeof directions[number]

	// export const type = isly.object<Creatable>({
	// 	counterpart: isly.fromIs("Rail.Address", Rail.Address.is),
	// 	currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
	// 	amount: isly.number(),
	// 	description: isly.string(),
	// })
	// export const is = type.is
	// export const flaw = type.flaw
	// export const get = type.get
}
