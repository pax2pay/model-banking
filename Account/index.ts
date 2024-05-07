import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Balances } from "../Balances"
import { Rail } from "../Rail"
import { Rule } from "../Rule"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account extends Account.Creatable {
	id: cryptly.Identifier
	created: isoly.DateTime
	balances: Balances
	rails: Rail.Address[]
	counterparts?: Record<string, Rail.Address>
	key?: string
	rules?: Rule[]
}
export namespace Account {
	export const type = isly.object<Account>({
		name: isly.string(),
		id: isly.string(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		balances: Balances.type,
		rails: Rail.Address.isType.array(),
		counterparts: isly.record<Record<string, Rail.Address>>(isly.string(), Rail.Address.isType).optional(),
		key: isly.string().optional(),
		rules: Rule.type.array().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}
	export import Creatable = AccountCreatable
}
