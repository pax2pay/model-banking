import { Transaction } from "../../Transaction"
import type { Changes } from "./index"
import { sum } from "./sum"

export function cancel(transaction: Transaction): Changes {
	const summed = sum(transaction.operations)
	return (
		Object.entries(summed).reduce(
			(changes, [balance, amount]) => ({
				...changes,
				[balance]: {
					amount: Math.abs(amount),
					type: amount >= 0 ? "subtract" : "add",
					status: "pending",
				},
			}),
			{}
		) ?? {}
	)
}
