import { Evaluation } from "./Evaluation"

export interface Score extends Omit<Evaluation, "action"> {
	action: "score"
	risk: number
}

export namespace Score {}
