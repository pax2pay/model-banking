import { isly } from "isly"
import { Card } from "../../Card"

export interface Fx extends Fx.Creatable {
	id: string
}
export namespace Fx {
	export interface Creatable {
		type: "fx"
		rate: number // rate: 0.01 for 1%
		applies: {
			to: {
				presets?: Card.Preset[]
			}
		}
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("fx"),
			rate: isly.number(),
			applies: isly.object({
				to: isly.object({
					presets: Card.Preset.type.array().optional(),
				}),
			}),
		})
	}
	export const type = Creatable.type.extend<Fx>({
		id: isly.string(),
	})
}
