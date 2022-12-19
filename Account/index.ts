import * as cryptly from "cryptly"
import * as isoly from "isoly"
import { Balances } from "../Balances"
import { Rail } from "../Rail"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account extends Account.Creatable {
	readonly id: cryptly.Identifier
	readonly created: isoly.DateTime
}

export namespace Account {
	export function fromCreatable(account: Creatable): Account {
		return {
			...account,
			id: cryptly.Identifier.generate(8),
			created: isoly.DateTime.now(),
		}
	}
	export function is(account: Account | any): account is Account {
		return (
			Account.Creatable.is({ ...account }) && cryptly.Identifier.is(account.id, 8) && isoly.DateTime.is(account.created)
		)
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}

	export type Creatable = AccountCreatable
	export const Creatable = AccountCreatable
	export type Info = Account & { rails: Rail[]; balances: Balances }
	export namespace Info {
		export function is(value: Info | any): value is Info {
			return (
				typeof value == "object" &&
				Account.is({ ...value }) &&
				Array.isArray(value.rails) &&
				value.rails.every((r: any) => Rail.is(r)) &&
				Balances.is(value.balances)
			)
		}
	}
}
