import { isly } from "isly"
import { Buffer as WarningBuffer } from "./Buffer"
import { Counterbalance as WarningCounterbalance } from "./Counterbalance"
import { Overdraft as WarningOverdraft } from "./Overdraft"
import { Stale as WarningUnguarded } from "./Stale"

export type Warning = Warning.Overdraft | Warning.Unguarded | Warning.Buffer | Warning.Counterbalance

export namespace Warning {
	export import Buffer = WarningBuffer
	export import Counterbalance = WarningCounterbalance
	export import Overdraft = WarningOverdraft
	export import Unguarded = WarningUnguarded
	export const type = isly.union<Warning, Overdraft, Unguarded, Buffer, Counterbalance>(
		Overdraft.type,
		Unguarded.type,
		Buffer.type,
		Counterbalance.type
	)
}
