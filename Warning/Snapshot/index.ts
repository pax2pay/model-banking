import { isly } from "isly"
import { MissingBuffer as WarningMissingBuffer } from "./MissingBuffer"
import { MissingEmoney as WarningMissingEmoney } from "./MissingEmoney"
import { MissingFiat as WarningMissingFiat } from "./MissingFiat"
import { Overdraft as WarningOverdraft } from "./Overdraft"
import { StaleFiat as WarningStaleFiat } from "./StaleFiat"

export type Snapshot =
	| Snapshot.Overdraft
	| Snapshot.StaleFiat
	| Snapshot.MissingBuffer
	| Snapshot.MissingEmoney
	| Snapshot.MissingFiat

export namespace Snapshot {
	export import Overdraft = WarningOverdraft
	export import StaleFiat = WarningStaleFiat
	export import MissingBuffer = WarningMissingBuffer
	export import MissingEmoney = WarningMissingEmoney
	export import MissingFiat = WarningMissingFiat
	export const type = isly.union<Snapshot, Overdraft, StaleFiat, MissingBuffer, MissingEmoney, MissingFiat>(
		Overdraft.type,
		StaleFiat.type,
		MissingBuffer.type,
		MissingEmoney.type,
		MissingFiat.type
	)
}
