import { isly } from "isly"
import { Amounts } from "../Amounts"
import { Fee } from "./Fee"

export type Total = {
	amount: Amounts
	fee: Fee
}

export namespace Total {
	export const type = isly.object<Total>({ amount: Amounts.type, fee: Fee.type })
	export const is = type.is
	export const flaw = type.flaw
}
