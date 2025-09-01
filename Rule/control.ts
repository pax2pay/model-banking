import { selectively } from "selectively"
import type { Rule } from "."
import type { State } from "./State"

export function control(rule: Rule, state: State, macros?: Record<string, selectively.Definition>): boolean {
	return selectively.resolve({ ...macros }, selectively.parse(rule.condition)).is(state)
}
