import { isly } from "isly"
import { Card as RailCard } from "./Card"
import { Iban as RailIban } from "./Iban"
import { Internal as RailInternal } from "./internal"
import { PaxGiro as RailPaxGiro } from "./PaxGiro"
import { Scan as RailScan } from "./Scan"

export type Rail = RailPaxGiro | RailInternal | RailIban | RailScan | RailCard

export namespace Rail {
	export const rails = ["paxgiro", "internal", "iban", "scan", "card"]
	export type Type = typeof rails[number]
	export const type = isly.string(rails)
	export function compare(rails: [Rail, Rail]): boolean {
		let result: boolean
		if (rails[0].type != rails[1].type)
			result = false
		else
			switch (rails[0].type) {
				case "iban":
					result = rails[1].type == "iban" && rails[0].iban == rails[1].iban
					break
				case "scan":
					result = rails[1].type == "scan" && rails[0].sort == rails[1].sort && rails[0].account == rails[1].account
					break
				case "paxgiro":
					result = rails[1].type == "paxgiro" && rails[0].identifier == rails[1].identifier
					break
				case "internal":
					result = rails[1].type == "internal" && rails[0].identifier == rails[1].identifier
					break
				case "card":
					result = rails[1].type == "card" && rails[0].id == rails[1].id
					break
			}
		return result
	}
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
