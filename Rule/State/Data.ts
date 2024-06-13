import { isoly } from "isoly"

export interface Data {
	countries: {
		eea: isoly.CountryCode.Alpha2[]
		sanctioned: isoly.CountryCode.Alpha2[]
		risk: { high: isoly.CountryCode.Alpha2[]; mediumHigh: isoly.CountryCode.Alpha2[] }
	}
	merchant: {
		known: string[]
		categories: {
			payment: string[]
			crypto: string[]
			gambling: string[]
			travel: string[]
			specialist: string[]
			media: string[]
			sabre: string[]
		}
		code: Record<string, string[]>
	}
}
