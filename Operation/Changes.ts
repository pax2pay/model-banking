import { isly } from "isly"
import { Balances } from "../Balances"
import { Counterbalances } from "../Counterbalances"
import { Change as Change } from "./Change"

export type Changes = Partial<Record<Balances.Entry | Counterbalances.Counter, Change>>

export namespace Changes {
	export const type = isly.record<Changes>(isly.string([...Balances.entries, ...Counterbalances.entries]), Change.type)
	export const is = type.is
}
