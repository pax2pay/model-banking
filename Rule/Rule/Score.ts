import { isly } from "isly"
import { Base } from "./Base"

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
}
