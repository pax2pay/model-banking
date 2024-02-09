import { isoly } from "isoly"
import { Snapshot } from "./Snapshot"

export type Snapshots = Partial<Record<isoly.Currency, Snapshot>>
