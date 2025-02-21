import { isly } from "isly"
// import { isly as isly2 } from "isly2"
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
// export const type2 = isly2
// 	.union<Rule, Other, Score, Charge.Api, Reserve>(Other.type2, Score.type2, Charge.Api.type2, Reserve.type2)
// 	.describe("Changes what how the rules is applied.")
