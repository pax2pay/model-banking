import { isly } from "isly"
import { Balance } from "../../Balance"
import { Base } from "../Base"

export interface Overdraft extends Base {
	type: "overdraft"
	balance: Balance.Extended
}

export namespace Overdraft {
	export const type = Base.type.extend<Overdraft>({
		type: isly.string("overdraft"),
		balance: Balance.Extended,
	})
}
