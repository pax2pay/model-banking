import { isoly } from "isoly"
import { Creatable } from "./Creatable"
import type { Operation } from "./index"

export function create(
	transaction: string,
	currency: isoly.Currency,
	account: string,
	type: Creatable.Type
): Omit<Operation, "changes"> {
	return {
		transaction,
		type,
		currency,
		account,
		counter: 0,
		created: isoly.DateTime.now(),
	}
}
