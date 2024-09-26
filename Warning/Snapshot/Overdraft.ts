import { isly } from "isly"
import { Balance } from "../../Balance"
import { Base } from "../Base"

export interface Overdraft extends Base {
	type: "overdraft"
	account: string
	balance: Balance.Extended
}

export namespace Overdraft {
	export const type = Base.type.extend<Overdraft>({
		type: isly.string("overdraft"),
		account: isly.string(),
		balance: Balance.Extended,
	})
}
