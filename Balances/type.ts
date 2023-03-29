export const BalanceEntries = ["actual", "incomingReserved", "outgoingReserved"] as const
export type BalanceEntry = typeof BalanceEntries[number]

export namespace BalanceEntry {
	export function is(value: any | BalanceEntry): value is BalanceEntry {
		return typeof value == "string" && (value == "actual" || value == "incomingReserved" || value == "outgoingReserved")
	}
}
