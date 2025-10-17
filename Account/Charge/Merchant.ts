import { isly } from "isly"
import { Rail } from "pax2pay"
import { Card } from "../../Card"
import { Charge } from "../Charge"

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
		charge: Charge.Merchant,
		counterpart: Rail.Address.Card.Counterpart,
		preset?: Card.Preset
	): boolean {
		const { presets, merchants } = charge.applies.to
		const chargePreset: boolean =
			presets === undefined || presets.length === 0 || (!!preset && presets.includes(preset))
		return chargePreset && merchants.some(merchant => Card.Restriction.Merchant.check(merchant, counterpart))
	}
}
