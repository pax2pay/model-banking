import { isoly } from "isoly"
import { Realm } from "../../../Realm"
import { Transaction as modelTransaction } from "../../../Transaction"
import { Base } from "./Base"

export interface Transaction extends Base<modelTransaction> {
	entity: { type: "transaction"; id: string }
	action: Transaction.Action
	isError?: true
}
export namespace Transaction {
	export type Action = typeof Action.values[number]
	export namespace Action {
		export const values = ["created", "finalized", "cancelled", "failed", "updated"] as const
	}
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
