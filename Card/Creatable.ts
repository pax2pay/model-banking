import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../Amount"
import { zod } from "../zod"
import { Expiry } from "./Expiry"
import { Meta } from "./Meta"
import { Preset } from "./Preset"
import { Restriction } from "./Restriction"

export interface Creatable {
	account: string
	number?: string
	preset: Preset
	details: {
		expiry: Expiry
		holder: string
	}
	limit: Amount
	meta?: Meta
	key?: isoly.Date | string
	restricted?: { to?: Restriction }
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		account: isly.string(),
		number: isly.string().optional(),
		preset: Preset.type,
		details: isly.object({ expiry: Expiry.type, holder: isly.string() }),
		limit: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		meta: isly.fromIs("Card.Meta", Meta.is).optional(),
		key: isly.string().optional(),
		restricted: isly.object<Required<Creatable>["restricted"]>({ to: Restriction.type.optional() }).optional(),
	})
	export const typeZod: zod.ZodType<Creatable> = zod.object({
		account: zod.string(),
		number: zod.string().optional(),
		preset: Preset.typeZod,
		details: zod.object({ expiry: Expiry.typeZod, holder: zod.string() }),
		limit: Amount.typeZod,
		meta: Meta.typeZod.optional(),
		key: zod.string().optional(),
		restricted: zod.object({ to: Restriction.typeZod.optional() }).optional(),
	})
}
