import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Identifier } from "../Identifier"
import { Operation } from "../Operation"
import { Rail } from "../Rail"
import { Collect as TransactionCollect } from "./Collect"
import { Creatable as TransactionCreatable } from "./Creatable"
import { Incoming as TransactionIncoming } from "./Incoming"
import { Note as TransactionNote } from "./Note"
import { Reference as TransactionReference } from "./Reference"
import { Status as TransactionStatus } from "./Status"

export interface Transaction extends Transaction.Creatable {
	organization: string
	accountId: string
	account: Rail.Address
	readonly id: cryptly.Identifier
	readonly reference?: Transaction.Reference
	readonly posted: isoly.DateTime
	transacted?: isoly.DateTime
	balance: number
	operations: Operation[]
	status: Transaction.Status
	rail?: Rail
	flags: ("review" | string)[]
	oldFlags: string[]
	notes: Transaction.Note[]
}
export namespace Transaction {
	export type Creatable = TransactionCreatable
	export const Creatable = TransactionCreatable
	export type Collect = TransactionCollect
	export const Collect = TransactionCollect
	export namespace Collect {
		export type Creatable = TransactionCollect.Creatable
	}
	export type Incoming = TransactionIncoming
	export const Incoming = TransactionIncoming
	export type Reference = TransactionReference
	export const Reference = TransactionReference
	export type Note = TransactionNote
	export const Note = TransactionNote
	export namespace Note {
		export type Creatable = TransactionNote.Creatable
	}
	export type Status = TransactionStatus
	export const Status = TransactionStatus
	export const type = Creatable.type.extend<Transaction>({
		organization: isly.string(),
		accountId: isly.string(),
		account: isly.fromIs("Rail", Rail.Address.is),
		id: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is).readonly(),
		reference: Reference.type.readonly().optional(),
		posted: isly.string(),
		transacted: isly.string().optional(),
		balance: isly.number(),
		operations: Operation.type.array(),
		status: Status.type,
		rail: Rail.type.optional(),
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
		account: Rail.Address,
		rail: Rail,
		transaction: Creatable,
		operations: Operation.Creatable[],
		balance: number
	): Transaction {
		const id = Identifier.generate()
		return {
			...transaction,
			organization,
			accountId,
			account,
			id,
			posted: isoly.DateTime.now(),
			balance,
			operations: operations.map(o => Operation.fromCreatable(id, o)),
			status: "created",
			rail,
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
	export function isIdentifier(value: string | any): value is string {
		return typeof value == "string"
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
