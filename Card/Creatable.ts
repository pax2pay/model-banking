import * as isoly from "isoly"
import { isly } from "isly"
import { Expiry } from "./Expiry"
import { Meta } from "./Meta"
import { Preset } from "./Preset"

export interface Creatable {
	account: string
	number?: string
	preset: Preset
	details: {
		iin: string
		expiry: Expiry
		holder: string
	}
	limit: [isoly.Currency, number]
	rules?: string[]
	meta?: Meta
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		account: isly.string(),
		number: isly.string().optional(),
		preset: Preset.type,
		details: isly.object({
			iin: isly.string(),
			expiry: Expiry.type,
			holder: isly.string(),
		}),
		limit: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		rules: isly.string().array().optional(),
		meta: isly.fromIs("Card.Meta", Meta.is).optional(),
	})
	export const is = type.is
}
