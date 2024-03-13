import { isoly } from "isoly"
import { isly } from "isly"
import { Identifier } from "../Identifier"
import { Amount as SettlementAmount } from "./Amount"
import { Batch as SettlementBatch } from "./Batch"
import { Creatable as SettlementCreatable } from "./Creatable"
import { Entry as SettlementEntry } from "./Entry"
import { Fee as SettlementFee } from "./Fee"
import { Status } from "./Status"
import { Total as SettlementTotal } from "./Total"
import { Totals as SettlementTotals } from "./Totals"

export interface Settlement extends Settlement.Creatable {
	id: string
	by?: string
	created: isoly.DateTime
	status: Status
	entries: Settlement.Entry.Summary
}
export namespace Settlement {
	export const Total = SettlementTotal
	export type Total = SettlementTotal
	export const Totals = SettlementTotals
	export type Totals = SettlementTotals
	export const Amount = SettlementAmount
	export type Amount = SettlementAmount
	export const Fee = SettlementFee
	export type Fee = SettlementFee
	export type Creatable = SettlementCreatable
	export const Creatable = SettlementCreatable
	export type Entry = SettlementEntry
	export const Entry = SettlementEntry
	export type Batch = SettlementBatch
	export const Batch = SettlementBatch
	export namespace Entry {
		export type Summary = SettlementEntry.Summary
		export type Creatable = SettlementEntry.Creatable
		export type Refund = SettlementEntry.Refund
		export namespace Refund {
			export type Creatable = SettlementEntry.Refund.Creatable
		}
		export type Cancel = SettlementEntry.Cancel
		export namespace Cancel {
			export type Creatable = SettlementEntry.Cancel.Creatable
		}
		export type Capture = SettlementEntry.Capture
		export namespace Capture {
			export type Creatable = SettlementEntry.Capture.Creatable
		}
		export type Unknown = SettlementEntry.Unknown
		export namespace Unknown {
			export type Creatable = SettlementEntry.Unknown.Creatable
		}
	}
	export function from(creatable: Settlement.Creatable, by: string): Settlement {
		return {
			id: Identifier.generate(),
			status: { collected: "pending", settled: "pending" },
			by,
			...creatable,
			created: isoly.DateTime.now(),
			entries: { count: 0 },
		}
	}
	export function compile(settlement: Settlement, entries: Settlement.Entry[]): Settlement {
		const result = { ...settlement }
		for (const entry of entries) {
			switch (entry.status) {
				case "succeeded":
					result.totals = Totals.addEntry(result.totals, entry)
					result.entries.count++
					break
				case "failed":
					result.entries.failed ? result.entries.failed.count++ : (result.entries.failed = { count: 1 })
					break
			}
		}
		return result
	}
	export const type = SettlementCreatable.type.extend<Settlement>({
		id: isly.string(),
		by: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		status: Status.type,
		entries: Settlement.Entry.Summary.type,
	})
	export const is = type.is
	export const flaw = type.flaw
}
