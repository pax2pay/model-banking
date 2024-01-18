import { isly } from "isly"
import { Amounts } from "../Amounts"
import { Transaction } from "../Transaction"
import { Fee } from "./Fee"

export type Total = {
	amount: Amounts
	fee: Fee
}
export namespace Total {
	export function initiate(partial?: Partial<Total>): Total {
		return { amount: partial?.amount ?? {}, fee: partial?.fee ?? { other: {} } }
	}
	export function add(addendee: Total, addend: Total): Total {
		return { amount: Amounts.add(addendee.amount, addend.amount), fee: Fee.add(addendee.fee, addend.fee) }
	}
	export function compare(expected: Total, outcome: Total): boolean {
		return Amounts.compare(expected.amount, outcome.amount) && Amounts.compare(expected.fee.other, outcome.fee.other)
	}
	export function from(collect: Transaction.Collect, collected: Total = initiate()): Total {
		let result: Total = collected
		for (const [currency, counterbalance] of Object.entries(collect.counterbalances)) {
			for (const [entry, amount] of Object.entries(counterbalance))
				if (entry.startsWith("fee"))
					result = add(result, initiate({ fee: { other: { [currency]: amount } } }))
				else if (entry.startsWith("settle"))
					result = add(result, initiate({ amount: { [currency]: amount } }))
		}
		return result
	}
	export const type = isly.object<Total>({ amount: Amounts.type, fee: Fee.type })
	export const is = type.is
	export const flaw = type.flaw
}
