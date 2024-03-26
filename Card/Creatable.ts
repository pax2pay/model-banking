import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../Amount"
import { Rule, type as ruleType } from "../Rule/Rule"
import { Expiry } from "./Expiry"
import { Meta } from "./Meta"
import { Preset } from "./Preset"

export interface Creatable {
	account: string
	number?: string
	preset: Preset
	details: {
		expiry: Expiry
		holder: string
	}
	limit: Amount
	rules?: Rule[]
	meta?: Meta
	key?: isoly.Date | string
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		account: isly.string(),
		number: isly.string().optional(),
		preset: Preset.type,
		details: isly.object({
			expiry: Expiry.type,
			holder: isly.string(),
		}),
		limit: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		rules: ruleType.array().optional(),
		meta: isly.fromIs("Card.Meta", Meta.is).optional(),
		key: isly.string().optional(),
	})
	export const is = type.is
}
