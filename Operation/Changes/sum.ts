import { isoly } from "isoly"
import type { Changes } from "./index"

export function sum(operations: { changes: Changes; currency: isoly.Currency }[]): Changes.Sum {
	const result: Changes.Sum = {}
	for (const operation of operations) {
		Object.entries(operation.changes).forEach(([entry, change]) => {
			result[entry as Changes.Entry.Balance] = isoly.Currency[change.type](
				operation.currency,
				result[entry as Changes.Entry.Balance] ?? 0,
				change.amount
			)
		})
	}
	return result
}
