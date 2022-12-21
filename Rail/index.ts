import { Iban as RailIban } from "./Iban"
import { Internal as RailInternal } from "./internal"
import { PaxGiro as RailPaxGiro } from "./PaxGiro"
import { Type as RailType } from "./Type"

export type Rail = RailPaxGiro | RailIban | RailInternal

export namespace Rail {
	export function parse(value: string): Rail | undefined {
		let result: Rail | undefined
		const splitted = value.split("-")
		switch (splitted[0]) {
			//case "iban":
			//	result = splitted.length == 2 ? { type: "iban", reference: splitted[1] } : undefined
			//	break
			case "pxg":
				result = splitted.length == 2 ? { type: "paxgiro", identifier: splitted[1] } : undefined
				break
			//case "swe":
			//	result =
			//		splitted.length == 3
			//			? { type: "swedish", clearing: Number.parseInt(splitted[1]), account: Number.parseInt(splitted[2]) }
			//			: undefined
			//	break
		}
		return result
	}
	export function stringify(rail: Rail): string {
		let result: string
		switch (rail.type) {
			case "iban":
				result = `iban-${rail.iban}`
				break
			case "paxgiro":
				result = `pxg-${rail.identifier}`
				break
			case "internal":
				result = ""
				break
			//case "swedish":
			//	result = `swe-${rail.clearing}-${rail.account}`
			//	break
		}
		return result
	}
	export function is(value: Rail | any): value is Rail {
		return typeof value == "object" && (PaxGiro.is(value) || Iban.is(value) || Internal.is(value))
	}

	export function hasSameIdentifiers(sender: Rail, recipient: Rail): boolean {
		let result = false
		if (sender.type == recipient.type) {
			switch (sender.type) {
				case "iban":
					result = sender.iban == (recipient as Iban).iban
					break
				case "paxgiro":
					result = sender.identifier == (recipient as PaxGiro).identifier
					break
				case "internal":
					result = sender.identifier == (recipient as Internal).identifier
					break
			}
		}
		return result
	}

	export type Type = RailType
	export type PaxGiro = RailPaxGiro
	export const PaxGiro = RailPaxGiro
	export type Iban = RailIban
	export const Iban = RailIban
	export type Internal = RailInternal
	export const Internal = RailInternal
}
