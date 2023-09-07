import { cryptly } from "cryptly"
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
	outcome?: Settlement.Total
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
	export const Entry = SettlementEntry
	export namespace Entry {
		export type Summary = SettlementEntry.Summary
		export type Creatable = SettlementEntry.Creatable
		export type Refund = SettlementEntry.Refund
		export type Cancel = SettlementEntry.Cancel
		export type Capture = SettlementEntry.Capture
		export type Unknown = SettlementEntry.Unknown
	}
	export function from(id: cryptly.Identifier, creatable: Settlement.Creatable, by: string): Settlement {
		return { id, status: "ongoing", by, expected: Total.initiate(), ...creatable, created: isoly.DateTime.now() }
	}
	export function compile(settlement: Settlement, entries: Settlement.Entry[]): Settlement {
		return entries.reduce(
			(r, entry) =>
				entry?.status == "succeeded"
					? { ...r, outcome: Total.add(r.outcome ?? Total.initiate(), Entry.compile(entry)) }
					: r,
			settlement
		)
	}
	export function toFailed(id: string, creatable: Settlement.Creatable, by: string, reason: string): Settlement {
		return {
			id,
			created: isoly.DateTime.now(),
			status: ["failed", reason],
			by,
			processor: creatable.processor,
			reference: creatable.reference,
			expected: Total.initiate(),
		}
	}
	export const type = isly.object({
		id: isly.string(),
		by: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		reference: isly.string(),
		processor: isly.string(),
		status: Status.type,
		expected: Settlement.Total.type,
		outcome: Settlement.Total.type.optional(),
		settled: Settled.type.optional(),
		entries: Settlement.Entry.Summary.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
