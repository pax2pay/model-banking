import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Identifier } from "../Identifier"
import { Operation } from "../Operation"
import { Rail } from "../Rail"
import { Report } from "../Report"
import type { Rule } from "../Rule"
import { Settlement } from "../Settlement"
import { Creatable as TransactionCreatable } from "./Creatable"
import { Incoming as TransactionIncoming } from "./Incoming"
import { Note as TransactionNote } from "./Note"
import { Reference as TransactionReference } from "./Reference"
import { Status as TransactionStatus } from "./Status"

export interface Transaction {
	counterpart: Rail.Address & { code?: string }
	currency: isoly.Currency
	amount: number
	fee?: number
	description: string
	organization: string
	accountId: string
	accountName?: string
	account: Rail.Address
	type?: Transaction.Types
	direction?: Transaction.Direction
	id: cryptly.Identifier
	reference?: Transaction.Reference
	posted: isoly.DateTime
	transacted?: isoly.DateTime
	by?: string
	balance: { actual: number; reserved: number; available: number }
	operations: Operation[]
	status: Transaction.Status
	rail?: Rail
	flags: string[]
	oldFlags: string[]
	notes: Transaction.Note[]
	risk?: number
	state?: Rule.State
}
export namespace Transaction {
	export const types = ["card", "internal", "external", "system"] as const
	export type Types = typeof types[number]
	export const directions = ["inbound", "outbound"] as const
	export type Direction = typeof directions[number]
	export import Creatable = TransactionCreatable
	export import Incoming = TransactionIncoming
	export import Reference = TransactionReference
	export import Note = TransactionNote
	export import Status = TransactionStatus
	export const type = isly.object<Transaction>({
		counterpart: isly.fromIs("Rail.Address", Rail.Address.is),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		fee: isly.number().optional(),
		description: isly.string(),
		organization: isly.string(),
		accountId: isly.string(),
		accountName: isly.string().optional(),
		account: Rail.Address.type,
		type: isly.string(types).optional(),
		direction: isly.string(directions).optional(),
		id: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is).readonly(),
		reference: Reference.type.readonly().optional(),
		posted: isly.string(),
		transacted: isly.string().optional(),
		by: isly.string().optional(),
		balance: isly.object<Transaction["balance"]>({
			actual: isly.number(),
			available: isly.number(),
			reserved: isly.number(),
		}),
		operations: Operation.type.array(),
		status: Status.type,
		rail: Rail.type.optional(),
		flags: isly.string().array(),
		oldFlags: isly.string().array(),
		notes: Note.type.array(),
		risk: isly.number().optional(),
		state: isly.any().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export const get = type.get
	export type Event = Omit<Transaction, "state">
	export namespace Event {
		export const type = Transaction.type.omit(["state"])
		export const is = type.is
		export const get = type.get
		export function from(transaction: Transaction): Event {
			return (({ state, ...event }) => event)(transaction)
		}
	}
	export function fromCreatable(
		creatable: Creatable & { counterpart: Rail.Address },
		id: string,
		state: Rule.State.Evaluated,
		account: { id: string; name: string; organization: string; address: Rail.Address },
		balance: { actual: number; reserved: number; available: number },
		operation: Operation | Status.Reason,
		by: string | undefined
	): Transaction {
		const status: Status =
			typeof operation == "string"
				? ["rejected", operation]
				: state.outcome == "reject"
				? ["rejected", "denied"]
				: state.outcome == "review"
				? "review"
				: "processing"
		const rail: Rail = state.card
			? state.card.scheme
			: account.address.type == "internal"
			? "internal"
			: account.address.type == "paxgiro"
			? "paxgiro"
			: "fasterpayments"
		return {
			...creatable,
			amount: -creatable.amount,
			type: getType(creatable.counterpart, account.name),
			direction: "outbound",
			organization: account.organization,
			accountId: account.id,
			accountName: account.name,
			account: account.address,
			id,
			posted: isoly.DateTime.now(),
			by,
			balance,
			operations: typeof operation == "string" ? [] : [operation],
			status,
			rail,
			flags: state.flags,
			oldFlags: [],
			notes: state.notes,
			state,
			risk: state.transaction.risk,
		}
	}
	export function empty(
		creatable: Creatable & { counterpart: Rail.Address },
		account: { id: string; name: string; organization: string; address: Rail.Address },
		balance: { actual: number; reserved: number; available: number },
		by: string | undefined
	): Transaction {
		return {
			...creatable,
			amount: 0,
			type: getType(creatable.counterpart, account.name),
			direction: "inbound",
			organization: account.organization,
			accountId: account.id,
			accountName: account.name,
			account: account.address,
			id: Identifier.generate(),
			posted: isoly.DateTime.now(),
			by,
			balance,
			operations: [],
			status: "review",
			rail: "internal",
			flags: [],
			oldFlags: [],
			notes: [],
		}
	}
	export function buffer(
		id: Identifier,
		account: { id: string; name: string; organization: string; address: Rail.Address },
		currency: isoly.Currency,
		balance: { actual: number; reserved: number; available: number },
		operation: Operation,
		by: string | undefined
	): Transaction {
		return {
			id,
			currency,
			counterpart: {
				type: "internal",
				identifier: account.id,
				name: account.name,
				organization: account.organization,
			},
			amount: 0,
			type: "internal",
			direction: "inbound",
			organization: account.organization,
			accountId: account.id,
			accountName: account.name,
			account: account.address,
			posted: isoly.DateTime.now(),
			transacted: isoly.DateTime.now(),
			by,
			balance,
			operations: [operation],
			status: "finalized",
			rail: "internal",
			flags: [],
			oldFlags: [],
			notes: [],
			description: "Buffer adjustment.",
		}
	}
	export function fromIncoming(
		transaction: Transaction.Incoming,
		id: string,
		state: Rule.State.Evaluated,
		account: { id: string; name: string; organization: string },
		balance: { actual: number; reserved: number; available: number },
		operation: Operation | undefined
	): Transaction {
		const status: Transaction.Status =
			state.outcome == "reject" ? ["rejected", "denied"] : state.outcome == "review" ? "review" : "processing"
		return {
			...transaction,
			type: getType(transaction.counterpart, account.name),
			direction: "inbound",
			organization: account.organization,
			accountId: account.id,
			accountName: account.name,
			balance,
			id,
			operations: !operation ? [] : [operation],
			status,
			flags: state.flags,
			oldFlags: [],
			notes: state.notes,
			state,
			risk: state.transaction.risk,
		}
	}
	export function fromRefund(
		refund: Settlement.Entry.Refund.Creatable,
		id: string,
		account: { id: string; name: string; organization: string },
		card: Rail.Address.Card,
		operation: Operation,
		balance: { actual: number; reserved: number; available: number }
	): Transaction {
		return {
			...Incoming.fromRefund(refund, card),
			type: "card",
			direction: "inbound",
			organization: account.organization,
			accountId: account.id,
			accountName: account.name,
			balance,
			id,
			operations: [operation],
			status: "review",
			flags: [],
			oldFlags: [],
			notes: [],
		}
	}
	export function isIdentifier(value: string | any): value is string {
		return typeof value == "string"
	}
	export function flag(transaction: Transaction, flags: string[] | undefined): void {
		const current = new Set<string>(transaction.flags)
		const old = new Set<string>(transaction.oldFlags)
		for (const flag of flags ?? []) {
			if (!flag.startsWith("-")) {
				old.delete(flag)
				current.add(flag)
			} else if (current.has(flag.substring(1))) {
				current.delete(flag.substring(1))
				old.add(flag.substring(1))
			}
		}
		transaction.flags = Array.from(current)
		transaction.oldFlags = Array.from(old)
	}
	export function getType(counterpart: Rail.Address, accountName: string): Types {
		let result: Types
		if (accountName.startsWith("settlement-") || accountName.startsWith("fee-") || accountName.startsWith("charge-"))
			result = "system"
		else if (counterpart.type == "internal")
			result = "internal"
		else if (counterpart.type == "card")
			result = "card"
		else
			result = "external"
		return result
	}

	const csvMap: Record<string, (transaction: Transaction) => string | number | undefined> = {
		id: (transaction: Transaction) => transaction.id,
		created: (transaction: Transaction) => readableDate(transaction.posted),
		changed: (transaction: Transaction) => readableDate(transaction.transacted),
		"organization.code": (transaction: Transaction) => transaction.organization,
		"account.id": (transaction: Transaction) => transaction.accountId,
		"rail.id": (transaction: Transaction) => railAddressId(transaction.account),
		"rail.address": (transaction: Transaction) => railAddress(transaction.account),
		"counterpart.id": (transaction: Transaction) => railAddressId(transaction.counterpart),
		"counterpart.address": (transaction: Transaction) => railAddress(transaction.counterpart),
		amount: (transaction: Transaction) =>
			transaction.amount.toFixed(isoly.Currency.decimalDigits(transaction.currency)),
		currency: (transaction: Transaction) => transaction.currency,
		status: (transaction: Transaction) =>
			typeof transaction.status == "string" ? transaction.status : transaction.status[0],
		"flags.current": (transaction: Transaction) => transaction.flags.join(" "),
		"flags.past": (transaction: Transaction) => transaction.oldFlags.join(" "),
		reason: (transaction: Transaction) => (typeof transaction.status == "string" ? undefined : transaction.status[1]),
		"merchant.country": transaction =>
			"merchant" in transaction.counterpart ? transaction.counterpart.merchant.country : undefined,
	}
	function readableDate(date: isoly.DateTime | undefined): string | undefined {
		return date && date.slice(0, 10) + " " + (date.endsWith("Z") ? date.slice(11, -1) : date.slice(11))
	}
	function railAddress(address: Rail.Address): string {
		return address.type != "card"
			? Rail.Address.stringify(address)
			: Rail.Address.Card.Counterpart.type.is(address)
			? `${address.merchant.category} ${address.merchant.name}`
			: `${address.iin}******${address.last4}`
	}
	function railAddressId(address: Rail.Address): string {
		return address.type != "card"
			? Rail.Address.stringify(address)
			: Rail.Address.Card.Counterpart.type.is(address)
			? address.merchant.id
			: address.id
	}
	export function toCsv(transactions: Transaction[]): string {
		return Report.toCsv(
			Object.keys(csvMap),
			transactions.map(transaction =>
				Report.Row.toCsv(
					Object.values(csvMap).map(c => c(transaction)),
					","
				)
			),
			","
		)
	}
}
