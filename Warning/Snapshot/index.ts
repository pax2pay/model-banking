import { isly } from "isly"
import { DeltaFiat as WarningDeltaFiat } from "./DeltaFiat"
import { MissingBuffer as WarningMissingBuffer } from "./MissingBuffer"
import { MissingEmoney as WarningMissingEmoney } from "./MissingEmoney"
import { MissingFiat as WarningMissingFiat } from "./MissingFiat"
import { MissingTransaction as WarningMissingTransaction } from "./MissingTransaction"
import { Overdraft as WarningOverdraft } from "./Overdraft"
import { Reconciliation as WarningReconciliation } from "./Reconciliation"
import { StaleFiat as WarningStaleFiat } from "./StaleFiat"

export type Snapshot =
	| Snapshot.DeltaFiat
	| Snapshot.MissingBuffer
	| Snapshot.MissingEmoney
	| Snapshot.MissingFiat
	| Snapshot.MissingTransaction
	| Snapshot.Overdraft
	| Snapshot.Reconciliation
	| Snapshot.StaleFiat

export namespace Snapshot {
	export import DeltaFiat = WarningDeltaFiat
	export import MissingBuffer = WarningMissingBuffer
	export import MissingEmoney = WarningMissingEmoney
	export import MissingFiat = WarningMissingFiat
	export import MissingTransaction = WarningMissingTransaction
	export import Overdraft = WarningOverdraft
	export import Reconciliation = WarningReconciliation
	export import StaleFiat = WarningStaleFiat

	export const type = isly.union<Snapshot>(
		DeltaFiat.type,
		MissingBuffer.type,
		MissingEmoney.type,
		MissingFiat.type,
		MissingTransaction.type,
		Overdraft.type,
		Reconciliation.type,
		StaleFiat.type
	)
}
