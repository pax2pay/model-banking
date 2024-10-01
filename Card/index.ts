import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../Amount"
import { Realm } from "../Realm"
import { Report } from "../Report"
import type { Rule } from "../Rule"
import { type as ruleType } from "../Rule/type"
import { Changeable as CardChangeable } from "./Changeable"
import { Creatable as CardCreatable } from "./Creatable"
import { Event as CardEvent } from "./Event"
import { Expiry as CardExpiry } from "./Expiry"
import { Meta as CardMeta } from "./Meta"
import { Preset as CardPreset } from "./Preset"
import { Scheme as CardScheme } from "./Scheme"
import { Stack as CardStack } from "./Stack"

export interface Card {
	id: string
	number?: string
	created: isoly.DateTime
	organization: string
	realm: Realm
	account: string
	preset: CardPreset
	scheme: CardScheme
	reference?: string
	details: { iin: string; last4: string; expiry: CardExpiry; holder: string; token?: string }
	limit: Amount
	spent: Amount
	status: "active" | "cancelled"
	history: any[]
	events?: Card.Event[]
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
		reference: isly.string().optional(),
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
		history: isly.any(),
		events: CardEvent.type.array().optional(),
		rules: ruleType.array(),
		meta: isly.fromIs("Card.Meta", CardMeta.is).optional(),
	})
	export const is = type.is
	export import Creatable = CardCreatable
	export import Preset = CardPreset
	export import Meta = CardMeta
	export import Expiry = CardExpiry
	export import Changeable = CardChangeable
	export import Event = CardEvent
	export import Scheme = CardScheme
	export import Stack = CardStack
	const csvMap: Record<string, (card: Card) => string | number | undefined> = {
		id: card => card.id,
		created: card => readableDate(card.created),
		cancelled: card => {
			if (card.events) {
				return readableDate(card.events.find(o => o.type == "cancel")?.at)
			} else {
				// for legacy reasons
				return readableDate(
					card.history?.find(o => o.type == "card" && "status" in o && o.status == "cancelled")?.created
				)
			}
		},
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
		"authorization.count": card => {
			const authorizations = card.events?.filter(o => o.type == "authorization" && o.outcome == "created").length ?? 0
			const legacy =
				card.history?.filter(o => o.type == "authorization" && "status" in o && o.status == "created").length ?? 0
			return authorizations + legacy
		},
		"capture.count": card => {
			const captures = card.events?.filter(o => o.type == "capture").length ?? 0
			const legacy =
				card.history?.filter(o => o.type == "authorization" && "status" in o && o.status == "captured").length ?? 0
			return captures + legacy
		},
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
