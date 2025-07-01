import { isly } from "isly"
import { isly as isly2 } from "isly2"
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
	export const type2 = isly2.string<Rail>("value", ...rails)
	export import Address = RailAddress
}
