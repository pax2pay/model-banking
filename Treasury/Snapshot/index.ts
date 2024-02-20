import { isoly } from "isoly"
import { isly } from "isly"
import { Fragment as SnapshotFragment } from "./Fragment"
import { Warning as SnapshotWarning } from "./Warning"

export type Snapshot = Partial<Record<isoly.Currency, Snapshot.Fragment>>

export namespace Snapshot {
	export type Fragment = SnapshotFragment
	export const Fragment = SnapshotFragment
	export type Warning = SnapshotWarning
	export const Warning = SnapshotWarning
	export const type = isly.record(isly.fromIs("Currency", isoly.Currency.is), Fragment.type)
}
