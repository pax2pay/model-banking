import { selectively } from "selectively"
import type { Rule } from "."
import { definitions } from "./definitions"
import type { State } from "./State"

export function control(rule: Rule, state: State, macros?: Record<string, selectively.Definition>): boolean {
	return selectively.resolve({ ...macros, ...definitions }, selectively.parse(rule.condition)).is(state)
}
