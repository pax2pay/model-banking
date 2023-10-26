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
	export const type = Creatable.type.extend<Transaction>({
		organization: isly.string(),
		accountId: isly.string(),
		account: isly.fromIs("Rail", Rail.is),
		id: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is).readonly(),
		reference: Reference.type.readonly().optional(),
		posted: isly.string(),
		transacted: isly.string().optional(),
		balance: isly.number(),
		operations: Operation.type.array(),
		status: Status.type,
		flags: isly.array(isly.string() || "review"),
		oldFlags: isly.string().array(),
		notes: Note.type.array(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export const get = type.get
	export function fromCreatable(
		organization: string,
		accountId: string,
		account: Rail,
		transaction: Creatable,
		operations: Operation.Creatable[],
		balance: number
	): Transaction {
		const id = Identifier.generate()
		return {
			...transaction,
			organization,
			accountId,
			account: account,
			id,
			posted: isoly.DateTime.now(),
			balance,
			operations: operations.map(o => Operation.fromCreatable(id, o)),
			status: "created",
			flags: [],
			oldFlags: [],
			notes: [],
		}
	}
	export function fromIncoming(
		organization: string,
		accountId: string,
		transaction: Incoming,
		operations: Operation.Creatable[],
		balance: number
	): Transaction {
		const id = Identifier.generate()
		return {
			...transaction,
			organization,
			accountId,
			balance,
			id,
			operations: operations.map(o => Operation.fromCreatable(id, o)),
			status: "created",
			flags: [],
			oldFlags: [],
			notes: [],
		}
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}
	export function flag(transaction: Transaction, note: Note): void {
		const flagSet = new Set<string>(transaction.flags)
		const oldFlagSet = new Set<string>(transaction.oldFlags)
		note.flags?.forEach(f =>
			f.startsWith("-")
				? (oldFlagSet.add(f.substring(1)), flagSet.delete(f.substring(1)))
				: (flagSet.add(f), oldFlagSet.delete(f))
		)
		transaction.flags = Array.from(flagSet)
		transaction.oldFlags = Array.from(oldFlagSet)
	}
}
