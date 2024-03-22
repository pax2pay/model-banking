import { Other } from "./Evaluation"

export interface Score extends Omit<Other, "action"> {
	action: "score"
	risk: number
}

export namespace Score {}
