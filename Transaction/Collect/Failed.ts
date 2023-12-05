import { gracely } from "gracely"
import { Counterbalances } from "../../CounterBalances"
import type { Transaction } from "../index"
import { Creatable } from "./Creatable"

export type Failed = { counterbalances: Counterbalances; reasons: Failed.Reason[] }
export namespace Failed {
	export type Reason = {
		transaction?: Partial<Transaction>
		collect?: Creatable
		error?: gracely.Error
	}
	export function from(collect: Creatable, error: gracely.Error, transaction?: Partial<Transaction>): Failed {
		return {
			counterbalances: transaction?.currency
				? {
						[transaction.currency]: { [collect.source]: transaction.amount },
				  }
				: {},
			reasons: [{ transaction, collect, error }],
		}
	}
	export function aggregate(addendee: Failed | undefined, addend: Failed | undefined): Failed | undefined {
		return !addendee
			? addend
			: !addend
			? addendee
			: {
					counterbalances: Counterbalances.add(addendee?.counterbalances, addend?.counterbalances),
					reasons: [...(addendee?.reasons ?? []), ...(addend?.reasons ?? [])],
			  }
	}
}
