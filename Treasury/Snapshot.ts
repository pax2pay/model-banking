import { isoly } from "isoly"
import { Snapshot } from "./Fragment"

export type Snapshot = Partial<Record<isoly.Currency, Snapshot>>
