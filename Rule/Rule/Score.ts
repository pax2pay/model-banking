import { isly } from "isly"

export interface Score {
	action: "score"
	risk: Score.Risk
}
export namespace Score {
	export type Risk = number
	export const Risk = isly.number<Risk>(["positive", "integer"])
	export const type = isly.object<Score>({ action: isly.string("score"), risk: Risk })
}
