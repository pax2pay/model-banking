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
	export const type = isly.object<Total>({ amount: Amounts.type, fee: Fee.type })
	export const is = type.is
	export const flaw = type.flaw
}
