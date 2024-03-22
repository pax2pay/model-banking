import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../Amount"
import { Realm } from "../Realm"
import { Rule } from "../Rule"
import { Changeable as CardChangeable } from "./Changeable"
import { Creatable as CardCreatable } from "./Creatable"
import { Expiry as CardExpiry } from "./Expiry"
import { Meta as CardMeta } from "./Meta"
import { Operation as CardOperation } from "./Operation"
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
		history: isly.array(CardOperation.type),
		rules: Rule.type.array(),
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
	export type Scheme = CardScheme
	export const Scheme = CardScheme
	export type Stack = CardStack
	export const Stack = CardStack
}
