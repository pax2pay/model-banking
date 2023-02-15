export type BalanceEntry = "actual" | "reserved"

export namespace BalanceEntry {
	export function is(value: any | BalanceEntry): value is BalanceEntry {
		return typeof value == "string" && (value == "actual" || value == "reserved")
	}
}
