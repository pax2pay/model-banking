import { isoly } from "isoly"
import { Realm } from "../../Realm"
import { Transaction as modelTransaction } from "../../Transaction"
import { Base } from "./Base"

export type Transaction = Base<modelTransaction> & {
	entity: { type: "transaction"; id: string }
	action: "created" | "finalized" | "cancelled" | "failed"
	isError?: true
}
export namespace Transaction {
	export function create(value: modelTransaction, realm: Realm, action: Transaction["action"]): Transaction {
		return {
			realm,
			entity: { type: "transaction", id: value.id },
			action,
			...(action == "failed" ? { isError: true } : {}),
			created: isoly.DateTime.now(),
			value,
		}
	}
}
