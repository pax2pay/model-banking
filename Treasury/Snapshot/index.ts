import { isoly } from "isoly"
import { isly } from "isly"
import { Emoney as SnapshotEmoney } from "./Emoney"
import { Fragment as SnapshotFragment } from "./Fragment"
import { Warning as SnapshotWarning } from "./Warning"

export type Snapshot = Partial<Record<isoly.Currency, Snapshot.Fragment>>

export namespace Snapshot {
	export import Fragment = SnapshotFragment
	export type Warning = SnapshotWarning
	export const Warning = SnapshotWarning
	export type Emoney = SnapshotEmoney
	export const type = isly.record(isly.fromIs("Currency", isoly.Currency.is), Fragment.type)
}
