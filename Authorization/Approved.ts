import { isly } from "isly"
import { Transaction } from "../Transaction"
import { Base } from "./Base"
import { Creatable } from "./Creatable"

export interface Approved extends Base {
	transaction: string
	status: "approved"
}

export namespace Approved {
	export const type = Base.type.extend<Approved>({
		transaction: isly.string(),
		status: isly.string("approved"),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function fromCreatable(authorization: Creatable, transaction: Transaction): Approved {
		return { ...Base.fromCreatable(authorization), transaction: transaction.id, status: "approved" }
	}
}
