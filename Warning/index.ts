import { isly } from "isly"
import { Base as WarningBase } from "./Base"
import { Snapshot as WarningSnapshot } from "./Snapshot"

export type Warning = Warning.Snapshot //| Settlement

export namespace Warning {
	export import Snapshot = WarningSnapshot
	export import Base = WarningBase
	export const type = isly.union<Warning>(Snapshot.type)
}
