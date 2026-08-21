import { isly } from "isly"
import { zod } from "../zod"
import { Address as RailAddress } from "./Address"

export type Rail = (typeof Rail.rails)[number]
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
		"sepa",
		"sepa-instant",
		"rix-rtgs",
		"rix-inst",
	] as const
	export const type = isly.string<Rail>(rails)
	export const typeZod = zod.enum(rails)
	export import Address = RailAddress
}
