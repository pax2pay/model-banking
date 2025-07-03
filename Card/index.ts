import { isoly } from "isoly"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
import { Amount } from "../Amount"
import { Realm } from "../Realm"
import { Report } from "../Report"
import type { Rule } from "../Rule"
import { type as ruleType } from "../Rule/type"
import { Changeable as CardChangeable } from "./Changeable"
import { Creatable as CardCreatable } from "./Creatable"
import { Expiry as CardExpiry } from "./Expiry"
import { Meta as CardMeta } from "./Meta"
import { Operation as CardOperation } from "./Operation"
import { Preset as CardPreset } from "./Preset"
import { Scheme as CardScheme } from "./Scheme"
import { Stack as CardStack } from "./Stack"
import { Statistics as CardStatistics } from "./Statistics"

export interface Card {
	id: string
	number?: string
	created: isoly.DateTime
	organization: string
	realm: Realm
	account: string
	preset: CardPreset
	scheme: CardScheme
	reference: string
	details: {
		iin: string
		last4: string
		expiry: CardExpiry
		holder: string
		token?: string
	}
	limit: Amount
	spent: Amount
	status: "active" | "cancelled"
	history: CardOperation[]
	rules: Rule[]
	meta?: CardMeta
}
export namespace Card {
	export const type = isly.object<Card>({
		id: isly.string(),
		number: isly.string().optional(),
		created: isly.string(),
		organization: isly.string(),
		realm: Realm.type,
		account: isly.string(),
		preset: CardPreset.type,
		scheme: CardScheme.type,
		reference: isly.string(),
		details: isly.object({
			iin: isly.string(),
			last4: isly.string(),
			expiry: CardExpiry.type,
			holder: isly.string(),
			token: isly.string().optional(),
		}),
		limit: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		spent: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		status: isly.union(isly.string("active"), isly.string("cancelled")),
		history: isly.array(CardOperation.type),
		rules: ruleType.array(),
		meta: isly.fromIs("Card.Meta", CardMeta.is).optional(),
	})
	export const type2: isly2.Object<Card> = isly2
		.object<Card>({
			id: isly2.string().rename("Id").describe("Unique 16 character base 64 identifier."),
			number: isly2.string().optional().rename("Number").describe("Api users identifier."),
			created: isly2.string().rename("Created").describe("Date and time of creation."),
			organization: isly2.string().rename("Organization").describe("Organization code."),
			realm: Realm.type2,
			account: isly2.string().rename("Account").describe("Account identifier."),
			preset: CardPreset.type2,
			scheme: CardScheme.type2,
			reference: isly2.string().rename("Reference").describe("Reference to external system."),
			details: isly2.object<Card["details"]>({
				iin: isly2.string().rename("Iin").describe("First 6-8 numbers of the pan."),
				last4: isly2.string().rename("Last4").describe("Last four digits of pan."),
				expiry: CardExpiry.type2,
				holder: isly2.string().rename("Holder").describe("Card holder name."),
				token: isly2.string().optional().rename("Token").describe("Encrypted token of the card."),
			}),
			limit: Amount.type2.rename("Limit").describe("Maximum amount that can be spent on the card."),
			spent: Amount.type2.rename("Spent").describe("Amount spent on the card."),
			status: isly2.string("value", ["active", "cancelled"]).rename("Status").describe("Current card status."),
			history: CardOperation.type2.array().rename("History").describe("Card operation history."),
			rules: isly2
				.from("Rule", ruleType.is)
				.array()
				.rename("Rules")
				.describe("Card rules that applies to authorizations made with the card."),
			meta: isly2.from("Card.Meta", CardMeta.is).optional().rename("Meta").describe("Additional card information."),
		})
		.rename("Card")
		.describe("Card information.")
	export import Creatable = CardCreatable
	export import Preset = CardPreset
	export import Meta = CardMeta
	export import Expiry = CardExpiry
	export import Changeable = CardChangeable
	export import Operation = CardOperation
	export import Scheme = CardScheme
	export import Stack = CardStack
	export import Statistics = CardStatistics
	const csvMap: Record<string, (card: Card) => string | number | undefined> = {
		id: card => card.id,
		created: card => readableDate(card.created),
		cancelled: card => readableDate(card.history.find(o => o.type == "card" && o.status == "cancelled")?.created),
		"organization.code": card => card.organization,
		realm: card => card.realm,
		account: card => card.account,
		preset: card => card.preset,
		scheme: card => card.scheme,
		reference: card => card.reference,
		currency: card => card.limit[0],
		limit: card => card.limit[1],
		spent: card => card.spent[1],
		status: card => card.status,
		expiry: card => readableDate(Expiry.toDateTime(card.details.expiry)),
		iin: card => card.details.iin,
		holder: card => card.details.holder,
		"authorization.count": card => card.history.filter(o => o.type == "authorization" && o.status == "created").length,
		"capture.count": card => card.history.filter(o => o.type == "authorization" && o.status == "captured").length,
	}
	function readableDate(date: isoly.DateTime | undefined): string | undefined {
		return date && date.slice(0, 10) + " " + (date.endsWith("Z") ? date.slice(11, -1) : date.slice(11))
	}
	export function toCsv(cards: Card[]): string {
		return Report.toCsv(
			Object.keys(csvMap),
			cards.map(card =>
				Report.Row.toCsv(
					Object.values(csvMap).map(c => c(card)),
					","
				)
			),
			","
		)
	}
}
