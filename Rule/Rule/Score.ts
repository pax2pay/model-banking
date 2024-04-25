import { isly } from "isly"
import { Base } from "./Base"

export interface Score extends Base {
	action: "score"
	category: "fincrime"
	risk: Score.Risk
}
export namespace Score {
	export type Risk = number
	export const Risk = isly.number<Risk>(["positive", "integer"])
	export const type = Base.type.extend<Score>({ action: isly.string("score"), risk: Risk })
}
