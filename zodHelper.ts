import { isoly } from "isoly"
import * as zod from "zod"

export namespace zodHelper {
	export const currency = zod.enum(isoly.Currency.values).meta({ id: "Currency" })
	export const countryCode = zod.enum(isoly.CountryCode.Alpha2.values).meta({ id: "CountryCode" })
	export const callingCode = zod.enum(isoly.CallingCode.values).meta({ id: "CallingCode" })
}
