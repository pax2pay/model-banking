import { isly } from "isly"
import { Balances } from "../../../Balances"

export interface Overdraft {
	type: "overdraft"
	account: string
	balance: Balances.Balance
}

export namespace Overdraft {
	export const type = isly.object<Overdraft>({
		type: isly.string("overdraft"),
		account: isly.string(),
		balance: Balances.Balance.type,
	})
}
