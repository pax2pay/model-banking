import { isly } from "isly"
import { Base as WarningBase } from "./Base"
import { Issue as WarningIssue } from "./Issue"
import { Settlement as WarningSettlement } from "./Settlement"
import { Snapshot as WarningSnapshot } from "./Snapshot"

export type Warning = Warning.Snapshot | Warning.Settlement

export namespace Warning {
	export import Snapshot = WarningSnapshot
	export import Settlement = WarningSettlement
	export import Base = WarningBase
	export import Issue = WarningIssue
	export namespace Type {
		export type Snapshot = WarningSnapshot["type"]
		export const Snapshot = isly.string<Snapshot>([
			"overdraft",
			"stale-fiat",
			"missing-buffer",
			"missing-emoney",
			"missing-fiat",
		])
		export type Settlement = WarningSettlement["type"]
		export const Settlement = isly.string<Settlement>(["negative-amount", "missing-file", "unknown-entry"])
	}
	export const type = isly.union<Warning, Snapshot, Settlement>(Snapshot.type, Settlement.type)
}
