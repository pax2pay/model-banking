import { isly } from "isly"
import { Realm } from "../../Realm"
import { zod } from "../../zod"
import { Bic as AddressBic } from "./Bic"
import { Card as AddressCard } from "./Card"
import { Iban as AddressIban } from "./Iban"
import { Internal as AddressInternal } from "./internal"
import { PaxGiro as AddressPaxGiro } from "./PaxGiro"
import { Route as AddressRoute } from "./Route"
import { Scan as AddressScan } from "./Scan"

export type Address =
	| AddressCard
	| AddressCard.Counterpart
	| AddressIban
	| AddressInternal
	| AddressPaxGiro
	| AddressScan
	| AddressBic
export namespace Address {
	export const realm: Record<Realm, string[]> = {
		test: ["paxgiro", "internal", "iban", "bic", "scan", "card", "paxgiro-credit"],
		uk: ["internal", "iban", "scan", "card"],
		eea: ["internal", "iban", "scan", "card"],
	}
	export const values = ["paxgiro", "internal", "iban", "bic", "scan", "card", "paxgiro-credit"] as const
	export type Type = (typeof values)[number]
	export function compare(addresses: [Address, Address]): boolean {
		return Object.entries(addresses[0]).every(([key, value]) => value == (addresses[1] as any)[key])
	}
	export function parse(value: string): Address | undefined {
		let result: Address | undefined
		const splitted = value.split("-")
		switch (splitted[0]) {
			case "pxg":
				result = splitted.length == 2 ? { type: "paxgiro", identifier: splitted[1]! } : undefined
				break
		}
		return result
	}
	export function stringify(address: Address): string {
		let result: string
		switch (address.type) {
			case "iban":
				result = `iban-${address.iban}`
				break
			case "paxgiro":
				result = `pxg-${address.identifier}`
				break
			case "internal":
				result = `internal-${address.identifier}`
				break
			case "scan":
				result = `scan-${address.sort}-${address.account}`
				break
			case "card":
				result = "id" in address ? `${address.type}-${address.id}` : `${address.type}-merchant-${address.merchant.id}`
				break
			case "bic":
				result = `bic-${address.institution}-${address.account}`
				break
		}
		return result
	}
	export function beautify(address: Address): string {
		let result: string
		switch (address.type) {
			case "iban":
				result = `${address.iban}`
				break
			case "paxgiro":
				result = `${address.identifier}`
				break
			case "internal":
				result = `${address.identifier}`
				break
			case "scan":
				result = `${address.sort} ${address.account}`
				break
			case "card":
				result = "id" in address ? `${address.type}-${address.id}` : `${address.type}-merchant-${address.merchant.id}`
				break
			case "bic":
				result = `${address.institution} ${address.account}`
				break
		}
		return result
	}
	export const type = isly.union<Address>(
		AddressCard.type,
		AddressCard.Counterpart.type,
		AddressIban.type,
		AddressInternal.type,
		AddressPaxGiro.type,
		AddressScan.type,
		AddressBic.type
	)
	export const typeZod = zod.union([
		AddressCard.typeZod,
		AddressCard.Counterpart.typeZod,
		AddressIban.typeZod,
		AddressInternal.typeZod,
		AddressPaxGiro.typeZod,
		AddressScan.typeZod,
		AddressBic.typeZod,
	])

	export import PaxGiro = AddressPaxGiro
	export import Iban = AddressIban
	export import Scan = AddressScan
	export import Internal = AddressInternal
	export import Card = AddressCard
	export import Route = AddressRoute
	export import Bic = AddressBic
}
