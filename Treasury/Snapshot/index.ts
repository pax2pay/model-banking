import { isoly } from "isoly"
import { isly } from "isly"
import { Warning as SnapshotWarning } from "../../Warning"
import { Emoney as SnapshotEmoney } from "./Emoney"
import { Fiat as SnapshotFiat } from "./Fiat"
import { Fragment as SnapshotFragment } from "./Fragment"
import { funding as snapshotFunding } from "./funding"

export type Snapshot = Partial<Record<isoly.Currency, Snapshot.Fragment>>

export namespace Snapshot {
	export import Fragment = SnapshotFragment
	export import Warning = SnapshotWarning
	export import funding = snapshotFunding
	export type Emoney = SnapshotEmoney
	export type Fiat = SnapshotFiat
	export const type = isly.record(isly.fromIs("Currency", isoly.Currency.is), Fragment.type)
}
