import { isoly } from "isoly"
import { isly } from "isly"
import { Amounts } from "../Amounts"
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
		return (
			([...new Set([...Object.keys(expected.amount), ...Object.keys(outcome.amount)])] as isoly.Currency[]).every(
				currency => expected.amount[currency] == outcome.amount[currency]
			) &&
			([...new Set([...Object.keys(expected.fee.other), ...Object.keys(outcome.fee.other)])] as isoly.Currency[]).every(
				currency => expected.fee.other[currency] == outcome.fee.other[currency]
			)
		)
	}
	export const type = isly.object<Total>({ amount: Amounts.type, fee: Fee.type })
	export const is = type.is
	export const flaw = type.flaw
}
