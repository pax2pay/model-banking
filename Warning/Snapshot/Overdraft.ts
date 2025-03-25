import { isoly } from "isoly"
import { isly } from "isly"
import { Base } from "../Base"

export interface Overdraft extends Base {
	type: "overdraft"
	organization: string
	currency: isoly.Currency
}

export namespace Overdraft {
	export const type = Base.type.extend<Overdraft>({
		type: isly.string("value", "overdraft"),
		organization: isly.string(),
		currency: isoly.Currency.type,
	})
}
