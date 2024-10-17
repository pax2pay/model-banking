import type { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export function collect(
	transaction: string,
	creatable: Transaction.Creatable,
	account: string,
	counterbalance: string
): Operation {
	return {
		...create(transaction, creatable.currency, account, "collect"),
		changes: Changes.incoming.collect(creatable, counterbalance),
	}
}
