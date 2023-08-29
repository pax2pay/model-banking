import { isoly } from "isoly"
import { isly } from "isly"
import { Creatable as SettlementCreatable } from "./Creatable"
import { Entry as SettlementEntry } from "./Entry"
import { Fee as SettlementFee } from "./Fee"
import { Settled } from "./Settled"
import { Status } from "./Status"
import { Total as SettlementTotal } from "./Total"

export interface Settlement {
	id: string
	by?: string
	created: isoly.DateTime
	reference: string
	processor: string
	status: Status
	expected: Settlement.Total
	calculated?: Settlement.Total
	settled?: Settled
	entries?: Settlement.Entry.Summary
}

export namespace Settlement {
	export const Total = SettlementTotal
	export type Total = SettlementTotal
	export const Fee = SettlementFee
	export type Fee = SettlementFee
	export type Creatable = SettlementCreatable
	export const Creatable = SettlementCreatable
	export type Entry = SettlementEntry
	export namespace Entry {
		export type Summary = SettlementEntry.Summary
		export const Summary = SettlementEntry.Summary
		export type Creatable = SettlementEntry.Creatable
		export const Creatable = SettlementEntry.Creatable
		export type Refund = SettlementEntry.Refund
		export const Refund = SettlementEntry.Refund
		export type Cancel = SettlementEntry.Cancel
		export const Cancel = SettlementEntry.Cancel
		export type Capture = SettlementEntry.Capture
		export const Capture = SettlementEntry.Capture
		export type Unknown = SettlementEntry.Unknown
		export const Unknown = SettlementEntry.Unknown
		export const from = SettlementEntry.from
		export const type = SettlementEntry.type
		export const is = SettlementEntry.is
		export const flaw = SettlementEntry.flaw
	}
	export const type = isly.object({
		id: isly.string(),
		by: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		reference: isly.string(),
		processor: isly.string(),
		status: Status.type,
		expected: Settlement.Total.type,
		calculated: Settlement.Total.type.optional(),
		settled: Settled.type.optional(),
		entries: Settlement.Entry.Summary.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
