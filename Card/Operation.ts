// import * as cryptly from "cryptly"
import * as isoly from "isoly"
// import { isly } from "isly"
import { Operation as BankingOperation } from "../Operation"

export type Operation =
	| BankingOperation
	| {
			type: "created" | "changed" | "cancelled"
			created: isoly.DateTime
	  }

export namespace Operation {
	// export const type = isly.union(isly.fromIs("Operation", BankingOperation.is), isly.object({id: }))
	export const is = () => false
}
