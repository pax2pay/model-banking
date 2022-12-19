import * as cryptly from "cryptly"
import * as isoly from "isoly"
import { Operation } from "../Operation"
import { Creatable as TransactionCreatable } from "./Creatable"

export interface Transaction extends TransactionCreatable {
	readonly id: cryptly.Identifier
	readonly timestamp: isoly.DateTime
	type: "actual" | "available"
	balance: number
	//status: "pending" | "settled" | "rejected" | "cancelled"
	operations: Operation[]
}

export namespace Transaction {
	export function is(value: any | Transaction): value is Transaction {
		return (
			typeof value == "object" &&
			TransactionCreatable.is({ ...value }) &&
			cryptly.Identifier.is(value.id, 8) &&
			isoly.DateTime.is(value.timestamp) &&
			(value.type == "actual" || value.type == "available") &&
			typeof value.balance == "number" &&
			Array.isArray(value.operations) &&
			value.operations.every(Operation.is)
		)
	}
	export function fromCreatable(
		transaction: Creatable & { operations: Operation.Creatable[] },
		type: "actual" | "available",
		result: number
	): Transaction {
		const id = cryptly.Identifier.generate(8)
		const timestamp = isoly.DateTime.now()
		return {
			id: id,
			timestamp: timestamp,
			type: type,
			balance: result,
			...transaction,
			operations: transaction.operations.map(Operation.fromCreatable),
		}
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}

	export type Creatable = TransactionCreatable
	export const Creatable = TransactionCreatable
}
