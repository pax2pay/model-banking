import { isly } from "isly"
import { Address as RailAddress } from "./Address"

export type Rail = typeof Rail.rails[number]
export namespace Rail {
	export const rails = ["internal", "paxgiro", "mastercard", "fasterpayments", "chaps", "transfer"] as const
	export const type = isly.string<Rail>(rails)
	export type Address = RailAddress
	export namespace Address {
		export const is = RailAddress.is
		export const compare = RailAddress.compare
		export const stringify = RailAddress.stringify
		export const beautify = RailAddress.beautify
		export type PaxGiro = RailAddress.PaxGiro
		export const PaxGiro = RailAddress.PaxGiro
		export type Iban = RailAddress.Iban
		export const Iban = RailAddress.Iban
		export type Scan = RailAddress.Scan
		export const Scan = RailAddress.Scan
		export type Internal = RailAddress.Internal
		export const Internal = RailAddress.Internal
		export type Card = RailAddress.Card
		export const Card = RailAddress.Card
		export namespace Card {
			export type Counterpart = RailAddress.Card.Counterpart
		}
	}
}
