import { selectively } from "selectively"
import { isly } from "isly"
import { Base } from "./Base"
import { control } from "./control"
import type { State } from "./State"

export interface Score extends Base {
	action: Score.Action
	category: "fincrime"
	risk: Score.Risk
}
export namespace Score {
	export type Action = typeof Action.value
	export namespace Action {
		export const value = "score"
	}
	export type Risk = number
	export const Risk = isly.number<Risk>(["positive", "integer"])
	export const type = Base.type.extend<Score>({
		action: isly.string(Action.value),
		category: isly.string("fincrime"),
		risk: Risk,
	})
	export function evaluate(
		rules: Score[],
		state: State,
		macros?: Record<string, selectively.Definition>
	): number | undefined {
		return rules.reduce(
			(r: number | undefined, rule) => (control(rule, state, macros) ? (r ?? 100) * (rule.risk / 100) : r),
			undefined
		)
	}
}
