import { isly } from "isly"
import { Address as RailAddress } from "./Address"

export interface Rail {
	name: string
	address: Rail.Address
}

export namespace Rail {
	export type Address = RailAddress
	export const Address = RailAddress
	export const type = isly.object<Rail>({
		name: isly.string(),
		address: isly.fromIs("Rail.Address", Rail.Address.is),
	})
	export const is = type.is
}
