import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
import { Identifier } from "../Identifier"
import { Batch as SettlementBatch } from "./Batch"
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
	reference?: string
	batch: SettlementBatch
	processor: Card.Stack
	status: Status
	expected?: Settlement.Total
	outcome: Settlement.Total
	settled?: Settled
	entries: Settlement.Entry.Summary
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
	export function initiate(id: string, by: string, batch: Batch, processor: Card.Stack): Settlement {
		return {
			id: id ?? Identifier.generate(),
			by,
			created: isoly.DateTime.now(),
			batch,
			processor,
			status: "ongoing",
			expected: Total.initiate(),
			outcome: Total.initiate(),
			entries: { count: 0 },
		}
	}
	export function from(id: string, creatable: Settlement.Creatable, by: string): Settlement {
		return {
			id,
			status: "ongoing",
			by,
			outcome: Total.initiate(),
			...creatable,
			created: isoly.DateTime.now(),
			entries: { count: 0 },
		}
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
			batch: creatable.batch,
			expected: Total.initiate(),
			outcome: Total.initiate(),
			entries: { count: 0 },
		}
	}
	export const type = isly.object<Settlement>({
		id: isly.string(),
		by: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		reference: isly.string().optional(),
		processor: Card.Stack.type,
		batch: Batch.type,
		status: Status.type,
		expected: Settlement.Total.type.optional(),
		outcome: Settlement.Total.type,
		settled: Settled.type.optional(),
		entries: Settlement.Entry.Summary.type,
	})
	export const is = type.is
	export const flaw = type.flaw
}
