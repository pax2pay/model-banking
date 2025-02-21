import { isoly } from "isoly"
import { selectively } from "selectively"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
import type { Note } from "../Transaction/Note"
import { Base } from "./Base"
import { control } from "./control"
import type { State } from "./State"

export interface Other extends Base {
	action: Other.Action
}
export namespace Other {
	export type Action = typeof Action.values[number]
	export namespace Action {
		export const values = ["review", "reject", "flag"] as const
		export const type = isly.string<Action>(values)
		export const type2 = isly2
			.string<Action>("value", ...values)
			.rename("Action")
			.describe("The action to take when the rule is applied.")
	}
	export const type = Base.type.extend<Other>({ action: Action.type })
	export const type2 = Base.type2.extend<Other>({ action: Action.type2 })
	export function evaluate(
		rules: Other[],
		state: State,
		macros?: Record<string, selectively.Definition>
	): { outcomes: Record<Other.Action, Other[]>; notes: Note[]; flags: Set<string> } {
		const now = isoly.DateTime.now()
		const result: ReturnType<typeof evaluate> = {
			outcomes: {
				review: [],
				reject: [],
				flag: [],
			},
			notes: [],
			flags: new Set<string>(),
		}
		if (
			state.transaction.stage == "initiate" &&
			["card", "external", "internal"].some(type => type == state.transaction.type)
		)
			for (const rule of rules)
				if (control(rule, state, macros)) {
					result.outcomes[rule.action].push(rule)
					result.notes.push({ author: "automatic", created: now, text: rule.name, rule })
					rule.flags.forEach(f => result.flags.add(f))
					rule.action == "review" && result.flags.add("review")
				}
		return result
	}
}
