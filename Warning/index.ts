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
	export const type = isly.union<Warning, Snapshot, Settlement>(Snapshot.type, Settlement.type)
}
