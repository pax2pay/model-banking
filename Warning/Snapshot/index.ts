import { isly } from "isly"
import { Counterbalance as WarningCounterbalance } from "./Counterbalance"
import { MissingBuffer as WarningMissingBuffer } from "./MissingBuffer"
import { Overdraft as WarningOverdraft } from "./Overdraft"
import { StaleFiat as WarningStaleFiat } from "./StaleFiat"

export type Snapshot = Snapshot.Overdraft | Snapshot.StaleFiat | Snapshot.MissingBuffer | Snapshot.Counterbalance

export namespace Snapshot {
	export import MissingBuffer = WarningMissingBuffer
	export import Counterbalance = WarningCounterbalance
	export import Overdraft = WarningOverdraft
	export import StaleFiat = WarningStaleFiat
	export const type = isly.union<Snapshot, Overdraft, StaleFiat, MissingBuffer, Counterbalance>(
		Overdraft.type,
		StaleFiat.type,
		MissingBuffer.type,
		Counterbalance.type
	)
}
