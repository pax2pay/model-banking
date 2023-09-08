import { Address as RailAddress } from "./Address"

export interface Rail {
	name: "faster payments" | "mastercard"
	address: Rail.Address
}

export namespace Rail {
	export type Address = RailAddress
	export const Address = RailAddress
}
