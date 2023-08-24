import { isly } from "isly"
import { Card as RailCard } from "./Card"
import { Iban as RailIban } from "./Iban"
import { Internal as RailInternal } from "./internal"
import { PaxGiro as RailPaxGiro } from "./PaxGiro"
import { Scan as RailScan } from "./Scan"

export type Rail = (RailPaxGiro | RailInternal | RailIban | RailScan | RailCard) & {
	reference?: { supplier: string; value: string }
}

export namespace Rail {
	export const rails = ["paxgiro", "internal", "iban", "scan", "card"]
	export type Type = typeof rails[number]
	export const type = isly.string(rails)
	export function parse(value: string): Rail | undefined {
		let result: Rail | undefined
		const splitted = value.split("-")
		switch (splitted[0]) {
			case "pxg":
				result = splitted.length == 2 ? { type: "paxgiro", identifier: splitted[1] } : undefined
				break
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
			case "card":
				result = `${rail.type}-${rail.id}`
				break
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
			case "card":
				result = `${rail.type}-${rail.id}`
				break
		}
		return result
	}
	export function is(value: Rail | any): value is Rail {
		return (
			value &&
			typeof value == "object" &&
			(PaxGiro.is(value) || Iban.is(value) || Internal.is(value) || Scan.is(value) || Card.is(value))
		)
	}
	export type PaxGiro = RailPaxGiro
	export const PaxGiro = RailPaxGiro
	export type Iban = RailIban
	export const Iban = RailIban
	export type Scan = RailScan
	export const Scan = RailScan
	export type Internal = RailInternal
	export const Internal = RailInternal
	export type Card = RailCard
	export const Card = RailCard
}
