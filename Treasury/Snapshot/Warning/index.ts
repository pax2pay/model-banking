import { isly } from "isly"
import { Counterbalance as WarningCounterbalance } from "../../../Counterbalance"
import { Buffer as WarningBuffer } from "./Buffer"
import { Overdraft as WarningOverdraft } from "./Overdraft"
import { Unguarded as WarningUnguarded } from "./Unguarded"

export type Warning = Warning.Overdraft | Warning.Unguarded | Warning.Buffer | Warning.Counterbalance

export namespace Warning {
	export import Counterbalance = WarningCounterbalance
	export import Unguarded = WarningUnguarded
	export import Overdraft = WarningOverdraft
	export import Buffer = WarningBuffer
	export const type = isly.union<Warning, Overdraft, Unguarded, Buffer, Counterbalance>(
		Overdraft.type,
		Unguarded.type,
		Buffer.type,
		Counterbalance.type
	)
}
