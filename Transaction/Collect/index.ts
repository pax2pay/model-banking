import { gracely } from "gracely"
import { Counterbalances } from "../../CounterBalances"
import type { Transaction } from "../index"
import { Creatable as CollectCreatable } from "./Creatable"
import { Failed } from "./Failed"

export type Collect = {
	counterbalances: Counterbalances
	failed?: Failed
}
export namespace Collect {
	export type Creatable = CollectCreatable
	export namespace Creatable {
		export const type = CollectCreatable.type
		export const is = CollectCreatable.type.is
		export const flaw = CollectCreatable.type.flaw
	}
	export function from(transaction: Partial<Transaction>, creatable: CollectCreatable, error?: gracely.Error): Collect {
		const counterbalances =
			transaction.currency && transaction.amount
				? { [transaction.currency]: { [creatable.source]: Math.abs(transaction.amount) } }
				: {}
		return error
			? {
					counterbalances: {},
					failed: Failed.from(creatable, error, transaction),
			  }
			: {
					counterbalances,
			  }
	}
	export function sum(collects: Collect[]): Collect {
		return collects.reduce((r, e) => aggregate(r, e), { counterbalances: {} })
	}
	export function aggregate(addendee: Collect, addend: Collect): Collect {
		return {
			counterbalances: Counterbalances.add(addendee.counterbalances, addend.counterbalances),
			failed: Failed.aggregate(addendee.failed, addend.failed),
		}
	}
}
