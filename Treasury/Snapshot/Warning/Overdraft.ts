import { isly } from "isly"
import { Balance } from "../../../Balance"

export interface Overdraft {
	type: "overdraft"
	account: string
	balance: Balance.Extended
}

export namespace Overdraft {
	export const type = isly.object<Overdraft>({
		type: isly.string("overdraft"),
		account: isly.string(),
		balance: Balance.Extended,
	})
}
