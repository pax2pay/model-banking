import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Operation } from "../Operation"
import { Rail } from "../Rail"
import { Creatable as TransactionCreatable } from "./Creatable"
import { Incoming as TransactionIncoming } from "./Incoming"
import { Note as TransactionNote } from "./Note"
import { Reference as TransactionReference } from "./Reference"
import { Status as TransactionStatus } from "./Status"

export interface Transaction extends Transaction.Creatable {
	organization: string
	accountId: string
	account: Rail
	readonly id: cryptly.Identifier
	readonly reference?: Transaction.Reference
	readonly posted: isoly.DateTime
	transacted?: isoly.DateTime
	balance: number
	operations: Operation[]
	status: Transaction.Status
	flags: ("review" | string)[]
	oldFlags: string[]
	notes: Transaction.Note[]
}

export namespace Transaction {
	export type Creatable = TransactionCreatable
	export const Creatable = TransactionCreatable
	export type Incoming = TransactionIncoming
	export const Incoming = TransactionIncoming
	export type Reference = TransactionReference
	export const Reference = TransactionReference
	export type Note = TransactionNote
	export const Note = TransactionNote
	export type Status = TransactionStatus
	export const Status = TransactionStatus
	export namespace Note {
		export type Creatable = TransactionNote.Creatable
	}
	export const type = Transaction.Creatable.type.extend<Transaction>({
		organization: isly.string(),
		accountId: isly.string(),
		account: isly.fromIs("Rail", Rail.is),
		id: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is).readonly(),
		reference: isly.fromIs("TransactionReference", Transaction.Reference.is).readonly().optional(),
		posted: isly.string(),
		transacted: isly.string().optional(),
		balance: isly.number(),
		operations: isly.array(isly.fromIs("Operation", Operation.is)),
		status: Transaction.Status.type,
		flags: isly.array(isly.string() || "review"),
		oldFlags: isly.string().array(),
		notes: isly.array(isly.fromIs("TransactionNote", Transaction.Note.is)),
	})
	export const is = type.is
	export const flaw = type.flaw
	export const get = type.get
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
			oldFlags: [],
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
			oldFlags: [],
			notes: [],
		}
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}
}
