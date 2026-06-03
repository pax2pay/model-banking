import { isly } from "isly"

export type Checks = (typeof Checks.value)[number]
export namespace Checks {
	export const value = [
		"bank feed integrity", // Proves Bank Prev Balance + Bank Txns = Bank Current Balance
		"external reconciliation", // Proves Internal Safeguard Mirror matches Actual Bank Balance
		"internal reconciliation", // Proves Total E-Money Liabilities match Internal Safeguard Mirror
		"ledger integrity", // Proves Opening Balance + Operations = Closing Balance
		"overdraft", // Warns if any customer accounts fall below zero
		"transaction match", // Proves all external bank txns have a 1:1 internal ledger txn
		"unidentified funds", // Flags any received money not yet assigned to a customer
	] as const
	export const type = isly.string(value)
}
