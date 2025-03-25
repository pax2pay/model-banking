import { isoly } from "isoly"
import { isoly as isoly } from "isoly"
import { isly } from "isly"
import { isly as isly } from "isly"
import { Amount } from "../Amount"
import type { Rule } from "../Rule"
import { type as ruleType } from "../Rule/type"
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
		limit: isly.tuple(isoly.Currency.type), isly.number()),
		rules: ruleType.array().optional(),
		meta: isly.fromIs("Card.Meta", Meta.is).optional(),
		key: isly.string().optional(),
	})
	export const type = isly.object<Creatable>({
		account: isly.string().rename("Account").describe("The account id the card was created on."),
		number: isly.string().optional().rename("Number").describe("The card identifier of the user of the api."),
		preset: Preset.type,
		details: isly
			.object({
				expiry: Expiry.type,
				holder: isly.string(),
			})
			.rename("Details")
			.describe("The card details, the information that will be displayed on the card."),
		limit: isly
			.tuple(isoly.Currency.type, isly.number().rename("Amount").describe("Amount in a specified currency."))
			.rename("Limit")
			.describe("Maximum amount that can be spent on the card."),
		rules: isly
			.from("Rule", ruleType.is)
			.array()
			.optional()
			.rename("Rules")
			.describe("Card rules that applies to authorizations made with the card."),
		meta: isly.from("Meta", Meta.is).optional(),
		key: isly.string().optional(),
	})
}
