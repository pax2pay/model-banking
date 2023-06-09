import { Iban as RailIban } from "./Iban"
import { Internal as RailInternal } from "./internal"
import { Mastercard as RailMastercard } from "./Mastercard"
import { PaxGiro as RailPaxGiro } from "./PaxGiro"
import { Scan as RailScan } from "./Scan"
import { Type as RailType } from "./Type"
import { Visa as RailVisa } from "./Visa"

export type Rail = (RailPaxGiro | RailInternal | RailIban | RailScan | RailMastercard | RailVisa) & {
	reference?: { supplier: string; value: string }
}

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
				result = `internal-${rail.identifier}`
				break
			case "scan":
				result = `scan-${rail.sort}-${rail.account}`
				break
			case "visa":
				result = `visa-${rail.id}`
				break
			case "mastercard":
				result = `mastercard-${rail.id}`
				break
			//case "swedish":
			//	result = `swe-${rail.clearing}-${rail.account}`
			//	break
		}
		return result
	}
	export function beautify(rail: Rail): string {
		let result: string
		switch (rail.type) {
			case "iban":
				result = `${rail.iban}`
				break
			case "paxgiro":
				result = `${rail.identifier}`
				break
			case "internal":
				result = `${rail.identifier}`
				break
			case "scan":
				result = `${rail.sort} ${rail.account}`
				break
			case "visa":
				result = `visa-${rail.id}`
				break
			case "mastercard":
				result = `mastercard-${rail.id}`
				break
			//case "swedish":
			//	result = `swe-${rail.clearing}-${rail.account}`
			//	break
		}
		return result
	}
	export function is(value: Rail | any): value is Rail {
		return (
			value &&
			typeof value == "object" &&
			(PaxGiro.is(value) ||
				Iban.is(value) ||
				Internal.is(value) ||
				Scan.is(value) ||
				Mastercard.is(value) ||
				Visa.is(value))
		)
	}

	export type Type = RailType
	export type PaxGiro = RailPaxGiro
	export const PaxGiro = RailPaxGiro
	export type Iban = RailIban
	export const Iban = RailIban
	export type Scan = RailScan
	export const Scan = RailScan
	export type Internal = RailInternal
	export const Internal = RailInternal
	export type Visa = RailVisa
	export const Visa = RailVisa
	export type Mastercard = RailMastercard
	export const Mastercard = RailMastercard
}
