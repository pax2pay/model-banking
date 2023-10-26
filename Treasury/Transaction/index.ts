import * as cryptly from "cryptly"
import * as isoly from "isoly"
import { Rail } from "../../Rail"
import { Creatable as TransactionCreatable } from "./Creatable"

export interface Transaction extends TransactionCreatable {
	debtor: Rail
	readonly id: cryptly.Identifier
	readonly created: isoly.DateTime
}
export namespace Transaction {
	export function is(value: any | Transaction): value is Transaction {
		return (
			value &&
			typeof value == "object" &&
			Rail.is(value.debtor) &&
			cryptly.Identifier.is(value.id) &&
			isoly.DateTime.is(value.created) &&
			Creatable.is({ ...value })
		)
	}
	export function fromCreatable(transaction: TransactionCreatable, debtor: Rail): Transaction {
		return {
			debtor,
			id: cryptly.Identifier.generate(8),
			created: isoly.DateTime.now(),
			...transaction,
		}
	}

	export const Creatable = TransactionCreatable
	export type Creatable = TransactionCreatable
}
