import * as isoly from "isoly"
import { Transaction } from "../Transaction"

export interface Decision extends Decision.Creatable {
	transaction: Transaction
	timestamp: isoly.DateTime
}

export namespace Decision {
	export function is(value: any | Decision): value is Decision {
		return Creatable.is({ ...value }) && Transaction.is(value.transaction) && isoly.DateTime.is(value.timestamp)
	}
	export interface Creatable {
		author: string
		status: "approved" | "rejected"
		comment: string
	}
	export namespace Creatable {
		export function is(value: any | Creatable): value is Creatable {
			return (
				value &&
				typeof value == "object" &&
				typeof value.author == "string" &&
				typeof value.comment == "string" &&
				(value.status == "rejected" || value.status == "approved")
			)
		}
	}
}
