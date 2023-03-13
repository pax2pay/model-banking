export type BalanceEntry = "actual" | "incoming reserved" | "outgoing reserved"

export namespace BalanceEntry {
	export function is(value: any | BalanceEntry): value is BalanceEntry {
		return (
			typeof value == "string" && (value == "actual" || value == "incoming reserved" || value == "outgoing reserved")
		)
	}
}
