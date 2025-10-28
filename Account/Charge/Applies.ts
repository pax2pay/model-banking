import { isly } from "isly"
import { Card } from "../../Card"
import type { Rail } from "../../Rail"
import type { Transaction } from "../../Transaction"

export interface Applies {
	to: {
		presets?: Card.Preset[]
		merchants?: Card.Restriction.Merchant[]
		fx?: boolean
	}
}
export namespace Applies {
	export const type = isly.object<Applies>({
		to: isly.object({
			presets: Card.Preset.type.array().optional(),
			merchants: Card.Restriction.Merchant.type.array().optional(),
			fx: isly.boolean().optional(),
		}),
	})
	export namespace Presets {
		export function evaluate(presets: Card.Preset[] = [], preset?: Card.Preset): boolean {
			return presets.length === 0 || (!!preset && presets.includes(preset))
		}
	}
	export namespace Merchant {
		export function evaluate(
			merchants: Card.Restriction.Merchant[] = [],
			counterpart: Rail.Address.Card.Counterpart
		): boolean {
			return (
				merchants.length === 0 || merchants.some(merchant => Card.Restriction.Merchant.check(merchant, counterpart))
			)
		}
	}
	export namespace Fx {
		export function evaluate(fx?: boolean, exchange?: Transaction.Exchange): boolean {
			return fx == undefined || (fx && !!exchange)
		}
	}
	export function evaluate(
		applies: Applies,
		counterpart: Rail.Address.Card.Counterpart,
		preset?: Card.Preset,
		exchange?: Transaction.Exchange
	): boolean {
		const result =
			Presets.evaluate(applies.to.presets, preset) &&
			Fx.evaluate(applies.to.fx, exchange) &&
			Merchant.evaluate(applies.to.merchants, counterpart)
		return result
	}
}
