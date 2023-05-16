import * as cryptly from "cryptly"
import * as isoly from "isoly"
import { Operation } from "../Operation"
import { Rail } from "../Rail"
import { Creatable as TransactionCreatable } from "./Creatable"
import { Incoming as TransactionIncoming } from "./Incoming"
import { Note as TransactionNote } from "./Note"
import { Reference as TransactionReference } from "./Reference"

export interface Transaction extends TransactionCreatable {
	organization: string
	accountId: string
	account: Rail
	readonly id: cryptly.Identifier
	readonly reference?: TransactionReference
	readonly posted: isoly.DateTime
	transacted?: isoly.DateTime
	balance: number
	operations: Operation[]
	status: "created" | "approved" | "rejected" | "processing" | "finalized"
	flags: ("review" | string)[]
	notes: TransactionNote[]
}

export namespace Transaction {
	export function is(value: any | Transaction): value is Transaction {
		return (
			typeof value == "object" &&
			typeof value.organization == "string" &&
			typeof value.accountId == "string" &&
			cryptly.Identifier.is(value.id, 8) &&
			Rail.is(value.account) &&
			Rail.is(value.counterpart) &&
			isoly.DateTime.is(value.posted) &&
			typeof value.balance == "number" &&
			Array.isArray(value.operations)
		)
	}
	export function fromCreatable(
		organization: string,
		accountId: string,
		account: Rail,
		transaction: Creatable & { operations: Operation.Creatable[] },
		result: number
	): Transaction {
		const id = cryptly.Identifier.generate(8)
		const timestamp = isoly.DateTime.now()
		if ("id" in transaction)
			delete transaction.id
		if ("posted" in transaction)
			delete transaction.posted
		return {
			organization: organization,
			accountId: accountId,
			account: account,
			id: id,
			posted: timestamp,
			balance: result,
			...transaction,
			operations: transaction.operations.map(o => Operation.fromCreatable(id, o)),
			status: "created",
			flags: [],
			notes: [],
		}
	}

	export function fromIncoming(
		organization: string,
		accountId: string,
		transaction: Incoming & { operations: Operation.Creatable[] },
		result: number
	): Transaction {
		const id = cryptly.Identifier.generate(8)
		if ("id" in transaction)
			delete transaction.id
		if ("transacted" in transaction)
			delete transaction.transacted
		return {
			organization: organization,
			accountId: accountId,
			id: id,
			balance: result,
			...transaction,
			operations: transaction.operations.map(o => Operation.fromCreatable(id, o)),
			status: "created",
			flags: [],
			notes: [],
		}
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}

	export type Creatable = TransactionCreatable
	export const Creatable = TransactionCreatable
	export type Incoming = TransactionIncoming
	export const Incoming = TransactionIncoming
	export type Reference = TransactionReference
	export type Note = TransactionNote
	export const Note = TransactionNote
	export namespace Note {
		export type Creatable = TransactionNote.Creatable
	}
}
