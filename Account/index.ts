import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Balances } from "../Balances"
import { Rail } from "../Rail"
import { Rule } from "../Rule"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account extends Account.Creatable {
	readonly id: cryptly.Identifier
	readonly created: isoly.DateTime
	readonly balances: Balances
	readonly rails: Rail.Address[]
	funder?: Record<
		string, // code
		{
			// support many?
			source: Rail.Address.Funding.Source // "paxgiro"
			reference: string // "abc123" (account id)
		}
	>
	key?: string
	readonly rules?: Rule[]
}

export namespace Account {
	export const type = isly.object<Account>({
		name: isly.string(),
		id: isly.string(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		balances: isly.fromIs("Balances", Balances.is),
		rails: isly.fromIs("Rail.Address", Rail.Address.is).array(),
		key: isly.string().optional(),
		rules: Rule.type.array().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}

	export type Creatable = AccountCreatable
	export const Creatable = AccountCreatable
}
