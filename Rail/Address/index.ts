import { isly } from "isly"
import { Card as AddressCard } from "./Card"
import { Iban as AddressIban } from "./Iban"
import { Internal as AddressInternal } from "./internal"
import { PaxGiro as AddressPaxGiro } from "./PaxGiro"
import { Scan as AddressScan } from "./Scan"

export type Address =
	| AddressPaxGiro
	| AddressInternal
	| AddressIban
	| AddressScan
	| AddressCard
	| AddressCard.Counterpart
export namespace Address {
	export const types = ["paxgiro", "internal", "iban", "scan", "card"] as const
	export type Type = typeof types[number]
	export const type = isly.string(types)
	export function compare(addresses: [Address, Address]): boolean {
		return Object.entries(addresses[0]).every(
			([key, value]: [keyof Address, Address[keyof Address]]) => value == addresses[1][key]
		)
	}
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
	export function stringify(Address: Address): string {
		let result: string
		switch (Address.type) {
			case "iban":
				result = `iban-${Address.iban}`
				break
			case "paxgiro":
				result = `pxg-${Address.identifier}`
				break
			case "internal":
				result = `internal-${Address.identifier}`
				break
			case "scan":
				result = `scan-${Address.sort}-${Address.account}`
				break
			case "card":
				result = "id" in Address ? `${Address.type}-${Address.id}` : `${Address.type}-merchant-${Address.merchant.id}`
				break
		}
		return result
	}
	export function beautify(Address: Address): string {
		let result: string
		switch (Address.type) {
			case "iban":
				result = `${Address.iban}`
				break
			case "paxgiro":
				result = `${Address.identifier}`
				break
			case "internal":
				result = `${Address.identifier}`
				break
			case "scan":
				result = `${Address.sort} ${Address.account}`
				break
			case "card":
				result = "id" in Address ? `${Address.type}-${Address.id}` : `${Address.type}-merchant-${Address.merchant.id}`
				break
		}
		return result
	}
	export function is(value: Address | any): value is Address {
		return (
			value &&
			typeof value == "object" &&
			(PaxGiro.is(value) ||
				Iban.is(value) ||
				Internal.is(value) ||
				Scan.is(value) ||
				Card.is(value) ||
				Card.Counterpart.type.is(value))
		)
	}
	export type PaxGiro = AddressPaxGiro
	export const PaxGiro = AddressPaxGiro
	export type Iban = AddressIban
	export const Iban = AddressIban
	export type Scan = AddressScan
	export const Scan = AddressScan
	export type Internal = AddressInternal
	export const Internal = AddressInternal
	export type Card = AddressCard
	export const Card = AddressCard
	export namespace Card {
		export type Counterpart = AddressCard.Counterpart
	}
}
