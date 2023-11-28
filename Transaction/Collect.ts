import { cryptly } from "cryptly"
import { Counterbalances } from "../CounterBalances"

export interface Collect {
	source: Counterbalances.Counterbalance
	target: cryptly.Identifier
}
export namespace Collect {
	// TODO add functions and stuff maybe don't let this get in to master...
	export const type = undefined
}
