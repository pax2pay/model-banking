import { isoly } from "isoly"
import { Rule } from "../Rule"
import { Creatable } from "./Creatable"
import type { Operation } from "./index"

export function create(
	transaction: string,
	type: Creatable.Type,
	state: Rule.State.Evaluated
): Omit<Operation, "changes"> {
	return {
		transaction,
		type,
		currency: state.transaction.original.currency,
		account: state.account.id,
		counter: 0,
		created: isoly.DateTime.now(),
	}
}
