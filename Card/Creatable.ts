import { isoly } from "isoly"
import { isoly as isoly2 } from "isoly2"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
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
		limit: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		rules: ruleType.array().optional(),
		meta: isly.fromIs("Card.Meta", Meta.is).optional(),
		key: isly.string().optional(),
	})
	export const type2 = isly2.object<Creatable>({
		account: isly2.string().rename("Account").describe("The account id the card was created on."),
		number: isly2.string().optional().rename("Number").describe("The card identifier of the user of the api."),
		preset: Preset.type2,
		details: isly2
			.object({
				expiry: Expiry.type2,
				holder: isly2.string(),
			})
			.rename("Details")
			.describe("The card details, the information that will be displayed on the card."),
		limit: isly2
			.tuple(isoly2.Currency.type, isly2.number().rename("Amount").describe("Amount in a specified currency."))
			.rename("Limit")
			.describe("Maximum amount that can be spent on the card."),
		rules: isly2
			.from("Rule", ruleType.is)
			.array()
			.rename("Rules")
			.describe("Card rules that applies to authorizations made with the card."),
		meta: isly2.from("Meta", Meta.is).optional(),
		key: isly2.string().optional(),
	})
}
