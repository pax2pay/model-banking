import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../Realm"
import { Changeable as CardChangeable } from "./Changeable"
import { Creatable as CardCreatable } from "./Creatable"
import { Expiry as CardExpiry } from "./Expiry"
import { Meta as CardMeta } from "./Meta"
import { Operation as CardOperation } from "./Operation"
import { Preset as CardPreset } from "./Preset"

export interface Card {
	id: string
	number?: string
	created: isoly.DateTime
	organization: string
	account: string
	realm: Realm
	preset: CardPreset
	reference?: string
	details: {
		iin: string
		last4: string
		expiry: CardExpiry
		holder: string
		token: string
	}
	limit: [isoly.Currency, number]
	spent: [isoly.Currency, number]
	status: "active" | "cancelled"
	history: CardOperation[]
	rules: string[]
	meta?: CardMeta
}

export namespace Card {
	export function fromCreatable(card: Creatable, organization: string, last4: string, token: string): Card {
		const created = isoly.DateTime.now()
		return {
			id: cryptly.Identifier.generate(8),
			number: card.number,
			created: created,
			organization: organization,
			account: card.account,
			realm: card.realm,
			preset: card.preset,
			details: {
				iin: card.details.iin,
				last4: last4,
				expiry: card.details.expiry,
				holder: card.details.holder,
				token: token,
			},
			limit: card.limit,
			spent: [card.limit[0], 0],
			status: "active",
			history: [{ type: "card", status: "created", created: created }],
			rules: card.rules ?? [],
			meta: card.meta,
		}
	}
	export const type = isly.object<Card>({
		id: isly.string(),
		number: isly.string().optional(),
		created: isly.string(),
		organization: isly.string(),
		account: isly.string(),
		realm: isly.fromIs("Realm", Realm.is),
		preset: CardPreset.type,
		reference: isly.string().optional(),
		details: isly.object({
			iin: isly.string(),
			last4: isly.string(),
			expiry: CardExpiry.type,
			holder: isly.string(),
			token: isly.string(),
		}),
		limit: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		spent: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		status: isly.union(isly.string("active"), isly.string("cancelled")),
		history: isly.array(CardOperation.type),
		rules: isly.string().array(),
		meta: isly.fromIs("Card.Meta", CardMeta.is).optional(),
	})
	export const is = type.is
	export type Creatable = CardCreatable
	export const Creatable = CardCreatable
	export type Preset = CardPreset
	export const Preset = CardPreset
	export type Meta = CardMeta
	export const Meta = CardMeta
	export type Expiry = CardExpiry
	export const Expiry = CardExpiry
	export type Changeable = CardChangeable
	export const Changeable = CardChangeable
	export type Operation = CardOperation
	export const Operation = CardOperation
}
