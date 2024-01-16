import { isly } from "isly"
import { Amounts } from "../Amounts"

export interface Settled {
	paid: Amounts
	transactions: string[]
}

export namespace Settled {
	export const type = isly.object<Settled>({
		paid: Amounts.type,
		transactions: isly.string().array(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
