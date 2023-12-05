import { isly } from "isly"
import { Amounts } from "../../Amounts"

export interface Conditions {
	minimum?: Amounts
}

export namespace Conditions {
	export const type = isly.object<Conditions>({ minimum: Amounts.type.optional() })
	export const is = type.is
}
