import { isly } from "isly"
import { Card as RailCard } from "./Card"
import { Iban as RailIban } from "./Iban"
import { Internal as RailInternal } from "./internal"
import { PaxGiro as RailPaxGiro } from "./PaxGiro"
import { Scan as RailScan } from "./Scan"

export type Address = (RailPaxGiro | RailInternal | RailIban | RailScan | RailCard) & {
	reference?: { supplier: string; value: string }
}

export namespace Address {
	export const types = ["paxgiro", "internal", "iban", "scan", "card"] as const
	export type Type = typeof types[number]
	export const type = isly.string(types)
	export function parse(value: string): Address | undefined {
		let result: Address | undefined
		const splitted = value.split("-")
		switch (splitted[0]) {
			case "pxg":
				result = splitted.length == 2 ? { type: "paxgiro", identifier: splitted[1] } : undefined
				break
		}
		return result
	}
	export function stringify(rail: Address): string {
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
	export function beautify(rail: Address): string {
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
	export function is(value: Address | any): value is Address {
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
