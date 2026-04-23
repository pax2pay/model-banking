import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
import { Creatable as TransactionCreatable } from "./Creatable"

export interface Transaction extends TransactionCreatable {
	reference: cryptly.Identifier
	created: string
	debtor: Rail.Address
	id?: string
}
export namespace Transaction {
	export import Creatable = TransactionCreatable
	export function fromCreatable(transaction: Creatable, debtor: Rail.Address): Transaction {
		return { debtor, reference: cryptly.Identifier.generate(8), created: isoly.DateTime.now(), ...transaction }
	}
	export const type = Creatable.type.extend<Transaction>({
		reference: isly.string(),
		created: isly.string(),
		debtor: Rail.Address.type,
		id: isly.string().optional(),
	})
}
