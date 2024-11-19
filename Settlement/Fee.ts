import { isly } from "isly"
import { Amounts } from "../Amounts"

export interface Fee {
	other: Amounts
}
export namespace Fee {
	export function add(addendee: Fee, addend: Fee): Fee {
		return { other: Amounts.add(addendee.other, addend.other) }
	}
	export const type = isly.object<Fee>({ other: Amounts.type })
}
