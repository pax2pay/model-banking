import { isly } from "isly"
import { Address as RailAddress } from "./Address"

export type Rail = typeof Rail.rails[number]
export namespace Rail {
	export const rails = [
		"internal",
		"paxgiro",
		"paxgiro-credit",
		"mastercard",
		"diners",
		"visa",
		"fasterpayments",
		"chaps",
		"bacs",
		"transfer",
		"credit",
	] as const
	export const type = isly.string<Rail>(rails)
	export import Address = RailAddress
}
