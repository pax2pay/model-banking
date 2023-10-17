import { isly } from "isly"
import { Rail } from "../Rail"
import { Creatable as TransactionCreatable } from "./Creatable"
import { Reference as TransactionReference } from "./Reference"

export interface Incoming extends TransactionCreatable {
	account: Rail
	posted: string
	reference?: TransactionReference
}
export namespace Incoming {
	export const type = TransactionCreatable.type.extend<Incoming>({
		account: isly.fromIs("Rail", Rail.is),
		posted: isly.string(),
		reference: TransactionReference.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
