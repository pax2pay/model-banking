import { isoly } from "isoly"
import { isly } from "isly"
import { Fragment as SnapshotFragment } from "./Fragment"

export type Snapshot = Partial<Record<isoly.Currency, Snapshot.Fragment>>

export namespace Snapshot {
	export type Fragment = SnapshotFragment
	export const Fragment = SnapshotFragment
	export const type = isly.record(isly.fromIs("Currency", isoly.Currency.is), Fragment.type)
}
