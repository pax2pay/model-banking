export type BalanceEntry = "actual" | "incomingReserved" | "outgoingReserved"

export namespace BalanceEntry {
	export function is(value: any | BalanceEntry): value is BalanceEntry {
		return typeof value == "string" && (value == "actual" || value == "incomingReserved" || value == "outgoingReserved")
	}
}
