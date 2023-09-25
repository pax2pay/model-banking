import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Identifier } from "../Identifier"
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
	export const type = TransactionCreatable.type.extend<Transaction>({
		organization: isly.string(),
		accountId: isly.string(),
		account: isly.fromIs("Rail", Rail.is),
		id: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is).readonly(),
		reference: isly.fromIs("TransactionReference", TransactionReference.is).readonly().optional(),
		posted: isly.string(),
		transacted: isly.string().optional(),
		balance: isly.number(),
		operations: isly.array(isly.fromIs("Operation", Operation.is)),
		status: isly.string(["created", "approved", "rejected", "processing", "finalized"]),
		flags: isly.array(isly.string() || "review"),
		notes: isly.array(isly.fromIs("TransactionNote", TransactionNote.is)),
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
		const id = Identifier.generate()
		return {
			organization,
			accountId,
			account,
			balance: result,
			...transaction,
			id,
			posted: isoly.DateTime.now(),
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
		const id = Identifier.generate()
		return {
			organization,
			accountId,
			balance: result,
			...transaction,
			id,
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
