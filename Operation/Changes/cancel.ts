import type { Changes } from "./index"

export function cancel(sum: Changes.Sum): Changes {
	return (
		Object.entries(sum).reduce(
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
