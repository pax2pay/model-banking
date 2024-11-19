import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Balances } from "../Balances"
import { Rail } from "../Rail"
import { Rule } from "../Rule"
import { Creatable as AccountCreatable } from "./Creatable"
import { History as AccountHistory } from "./History"
import { Status as AccountStatus } from "./Status"

export interface Account extends Account.Creatable {
	id: cryptly.Identifier
	created: isoly.DateTime
	balances: Balances
	rails: Rail.Address[]
	counterparts?: Record<string, Rail.Address>
	key?: string
	rules?: Rule[]
	status: Account.Status
}
export namespace Account {
	export type Legacy = Omit<Account, "status">
	export function fromLegacy(maybeLegacy: Legacy | Account, status?: Account.Status): Account {
		return { ...maybeLegacy, status: status ?? ("status" in maybeLegacy ? maybeLegacy.status : { mode: "active" }) }
	}
	export const type = isly.object<Account>({
		name: isly.string(),
		id: isly.string(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		balances: Balances.type,
		rails: Rail.Address.type.array(),
		counterparts: isly.record<Record<string, Rail.Address>>(isly.string(), Rail.Address.type).optional(),
		key: isly.string().optional(),
		rules: Rule.type.array().optional(),
		status: AccountStatus.type,
	})
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}
	export import Creatable = AccountCreatable
	export import Status = AccountStatus
	export import History = AccountHistory
}
