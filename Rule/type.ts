import { isly } from "isly"
// import { isly as isly } from "isly"
import { Charge } from "./Charge"
import type { Rule } from "./index"
import { Other } from "./Other"
import { Reserve } from "./Reserve"
import { Score } from "./Score"

export const type = isly.union<Rule, Other, Score, Charge.Api, Reserve>(
	Other.type,
	Score.type,
	Charge.Api.type,
	Reserve.type
)
// TODO: Implement type
// export const type = isly
// 	.union<Rule, Other, Score, Charge.Api, Reserve>(Other.type, Score.type, Charge.Api.type, Reserve.type)
// 	.describe("Changes what how the rules is applied.")
