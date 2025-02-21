import { isoly } from "isoly"
import { selectively } from "selectively"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
import type { Note } from "../Transaction/Note"
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
	export const type2 = Base.type2.extend<Score>({
		action: isly2
			.string("value", Action.value)
			.rename("Action")
			.describe("The action to take when the rule is applied."),
		category: isly2.string("value", "fincrime").rename("Category").describe("The category of the rule."),
		risk: isly2
			.number<Risk>()
			.restrict("integer")
			.restrict("positive")
			.rename("Risk")
			.describe("The risk of the rule."),
	})
	export function evaluate(
		rules: Score[],
		state: State,
		macros?: Record<string, selectively.Definition>
	): {
		outcomes: Score[]
		notes: Note[]
		risk?: number | undefined
	} {
		const result: ReturnType<typeof evaluate> = { outcomes: [], notes: [] }
		const now = isoly.DateTime.now()
		if (
			state.transaction.stage == "initiate" &&
			["card", "external", "internal"].some(type => type == state.transaction.type)
		)
			for (const rule of rules)
				if (control(rule, state, macros)) {
					result.risk = (result.risk ?? 100) * (rule.risk / 100)
					result.outcomes.push(rule)
					result.notes.push({ author: "automatic", created: now, text: rule.name, rule })
				}
		return result
	}
}
