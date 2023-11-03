import { isoly } from "isoly"
import { Card as ModelCard } from "../../Card"

export interface Data {
	countries: {
		sanctioned: isoly.CountryCode.Alpha2[]
		risk: { high: isoly.CountryCode.Alpha2[]; mediumHigh: isoly.CountryCode.Alpha2[] }
	}
	merchant: {
		known: string[]
		categories: {
			payment: string[]
			crypto: string[]
			gambling: string[]
			default: string[]
			specialist: string[]
			defaultMedia: string[]
			sabre: string[]
		}
	}
}

export namespace Data {
	export function from(data: ModelData): Data {
		return Data
	}
	export const type = ModelCard.type
	export const is = type.is
	export const flaw = type.flaw
}
