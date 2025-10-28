import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../../../Card"

export interface Charge {
	merchant?: Charge.Merchant
	fx?: Charge.Fx
}
export namespace Charge {
	export interface Fx {
		amount: number
		rate: number
		preset: Card.Preset | "default"
	}
	export namespace Fx {
		export const type = isly.object<Fx>({
			amount: isly.number(),
			rate: isly.number(),
			preset: isly.union(Card.Preset.type, isly.string("default")),
		})
	}
	export interface Merchant {
		amount: number
		rate: number
		merchant: Card.Restriction.Merchant
		preset: Card.Preset | "default"
	}
	export namespace Merchant {
		export const type = isly.object<Merchant>({
			amount: isly.number(),
			rate: isly.number(),
			merchant: Card.Restriction.Merchant.type,
			preset: isly.union(Card.Preset.type, isly.string("default")),
		})
	}
	export function total(currency: isoly.Currency, charges: Charge): number {
		return isoly.Currency.add(currency, charges.fx?.amount ?? 0, charges.merchant?.amount ?? 0)
	}
	export const type = isly.object<Charge>({
		merchant: Charge.Merchant.type.optional(),
		fx: Charge.Fx.type.optional(),
	})
}
