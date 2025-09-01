import { isoly } from "isoly"
import { isly } from "isly"
import { Amounts } from "../Amounts"
import { Settlement as SettlementWarning } from "../Warning/Settlement"
import { Amount as SettlementAmount } from "./Amount"
import { Batch as SettlementBatch } from "./Batch"
import { Creatable as SettlementCreatable } from "./Creatable"
import { Entry as SettlementEntry } from "./Entry"
import { Fee as SettlementFee } from "./Fee"
import { Identifier as SettlementIdentifier } from "./Identifier"
import { Status } from "./Status"
import { Total as SettlementTotal } from "./Total"
import { Totals as SettlementTotals } from "./Totals"

export interface Settlement extends Settlement.Creatable {
	id: SettlementIdentifier | string // string is deprecated and there for legacy reasons
	by?: string
	created: isoly.DateTime
	status: Status
	entries: Settlement.Entry.Summary
	warnings?: Settlement.Warning[]
}
export namespace Settlement {
	export import Identifier = SettlementIdentifier
	export import Total = SettlementTotal
	export import Totals = SettlementTotals
	export import Amount = SettlementAmount
	export import Fee = SettlementFee
	export import Creatable = SettlementCreatable
	export import Entry = SettlementEntry
	export import Batch = SettlementBatch
	export import Warning = SettlementWarning
	export function from(id: Settlement.Identifier, creatable: Settlement.Creatable, by: string): Settlement {
		return {
			id,
			status: { collected: "pending", settled: "pending" },
			by,
			...creatable,
			created: isoly.DateTime.now(),
			entries: { count: 0 },
		}
	}
	export function compile(settlement: Settlement, entries: (Settlement.Entry | Settlement.Entry.Failed)[]): Settlement {
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
			if (entry.type == "unknown") {
				;(result.warnings ??= []).push(Warning.UnknownEntry.create(entry, settlement.id))
			}
		}
		return result
	}
	type OldTotal = { amount: Amounts; fee: Fee }
	export type OldSettlement = Omit<Settlement, "totals"> & {
		expected?: OldTotal
		collected?: OldTotal
		outcome: OldTotal
		settled?: { paid: Amounts; transactions: string[] }
	}
	export type MaybeOld = Settlement | OldSettlement
	export function fromLegacy(settlement: MaybeOld): Settlement {
		let result: Settlement
		if (!type.is(settlement)) {
			const totalToAmount: (currency: isoly.Currency, total?: OldTotal) => Amount = (currency, oldTotal) => ({
				net: oldTotal?.amount[currency] ?? 0,
				fee: { other: oldTotal?.fee.other[currency] ?? 0 },
			})
			const { expected, collected, outcome, settled, ...partialSettlement } = settlement
			const currencies = Array.from(
				new Set<isoly.Currency>([
					...Object.keys(expected?.amount ?? {}),
					...Object.keys(collected?.amount ?? {}),
					...Object.keys(settled?.paid ?? {}),
					...Object.keys(outcome.amount),
				] as isoly.Currency[])
			)
			const totals = currencies.reduce((total, currency) => {
				total[currency] = {
					expected: totalToAmount(currency, expected),
					...(outcome ? { outcome: totalToAmount(currency, outcome) } : {}),
					...(collected
						? { collected: { ...totalToAmount(currency, collected), transactions: { net: "", fee: "" } } } //TODO: Find transactions?
						: {}),
					...(settled ? { settled: { net: settled.paid[currency] ?? 0, transactions: settled.transactions } } : {}), //Find transactions?
				}
				return total
			}, {} as Totals)
			result = { ...partialSettlement, totals }
		} else
			result = settlement
		return result
	}
	export const type = SettlementCreatable.type.extend<Settlement>({
		id: isly.union(SettlementIdentifier.type, isly.string()),
		by: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		status: Status.type,
		entries: Settlement.Entry.Summary.type,
		warnings: Settlement.Warning.type.array().optional(),
	})
}
