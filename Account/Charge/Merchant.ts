import { isly } from "isly"
import { Rail } from "pax2pay"
import { Card } from "../../Card"

export interface Merchant extends Merchant.Creatable {
	id: string
}
export namespace Merchant {
	export interface Creatable {
		type: "merchant"
		destination: { account: string }
		rate: number // rate: 0.01 for 1%
		applies: {
			to: {
				presets?: Card.Preset[]
				merchants: Card.Restriction.Merchant[]
			}
		}
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string(),
			destination: isly.object({ account: isly.string() }),
			rate: isly.number(),
			applies: isly.object({
				to: isly.object({
					presets: Card.Preset.type.array().optional(),
					merchants: Card.Restriction.Merchant.type.array(),
				}),
			}),
		})
	}
	export const type = Creatable.type.extend<Merchant>({
		id: isly.string(),
	})
	export function evaluate(
		merchants: Card.Restriction.Merchant[] = [],
		counterpart: Rail.Address.Card.Counterpart
	): boolean {
		return merchants.some(merchant => Card.Restriction.Merchant.check(merchant, counterpart))
	}
}
