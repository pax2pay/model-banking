import { isoly } from "isoly"
import { isly } from "isly"

export interface Acquirer {
	id: string
	number: string
	country?: isoly.CountryCode.Alpha2
}

export namespace Acquirer {
	export const type = isly.object<Acquirer>({
		id: isly.string(),
		number: isly.string(),
		country: isly.fromIs("Acquirer.country", isoly.CountryCode.Alpha2.is).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
