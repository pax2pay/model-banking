import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
import { Supplier } from "../Supplier"
import { zod } from "../zod"

export interface Details {
	supplier: Supplier
	currencies: isoly.Currency[]
	reference?: string
	addresses: Rail.Address[]
}
export namespace Details {
	export const type = isly.object<Details>({
		supplier: Supplier.type,
		currencies: isly.string(isoly.Currency.values).array(),
		reference: isly.string().optional(),
		addresses: Rail.Address.type.array(),
	})
	export const typeZod: zod.ZodType<Details> = zod.object({
		supplier: Supplier.typeZod,
		currencies: zod.array(zod.enum(isoly.Currency.values)),
		reference: zod.string().optional(),
		addresses: zod.array(Rail.Address.typeZod),
	})
	export interface Creatable {
		supplier: Supplier
		currency: isoly.Currency
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			supplier: Supplier.type,
			currency: isly.string(isoly.Currency.values),
		})
		export const typeZod: zod.ZodType<Creatable> = zod.object({
			supplier: Supplier.typeZod,
			currency: zod.enum(isoly.Currency.values),
		})
	}
}
