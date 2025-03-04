import { isly } from "isly"
import { typedly } from "typedly"
import { Realm } from "../../Realm"
import { Card as AddressCard } from "./Card"
import { Iban as AddressIban } from "./Iban"
import { Internal as AddressInternal } from "./internal"
import { PaxGiro as AddressPaxGiro } from "./PaxGiro"
import { PaxgiroCredit as AddressPaxgiroCredit } from "./PaxgiroCredit"
import { Route as AddressRoute } from "./Route"
import { Scan as AddressScan } from "./Scan"

export type Address =
	| AddressCard
	| AddressCard.Counterpart
	| AddressPaxgiroCredit
	| AddressIban
	| AddressInternal
	| AddressPaxGiro
	| AddressScan
export namespace Address {
	export const realm: Record<Realm, string[]> = {
		test: ["paxgiro", "internal", "iban", "scan", "card", "paxgiro-credit"],
		uk: ["internal", "iban", "scan", "card"],
		eea: ["internal", "iban", "scan", "card"],
	}
	export const values = ["paxgiro", "internal", "iban", "scan", "card", "paxgiro-credit"] as const
	export type Type = typeof values[number]
	export function compare(addresses: [Address, Address]): boolean {
		return typedly.Object.entries(addresses[0]).every(
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
			case "paxgiro-credit":
				result = `${Address.type}-${Address.reference}`
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
			case "paxgiro-credit":
				result = `${Address.type}-${Address.reference}`
				break
		}
		return result
	}
	export const type = isly.union<Address>(
		AddressCard.type,
		AddressCard.Counterpart.type,
		AddressPaxgiroCredit.type,
		AddressIban.type,
		AddressInternal.type,
		AddressPaxGiro.type,
		AddressScan.type
	)

	export import PaxGiro = AddressPaxGiro
	export import Iban = AddressIban
	export import Scan = AddressScan
	export import Internal = AddressInternal
	export import Card = AddressCard
	export import PaxgiroFunding = AddressPaxgiroCredit
	export import Route = AddressRoute
}
