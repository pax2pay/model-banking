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
import { Statistics as TransactionStatistics } from "./Statistics"
import { Status as TransactionStatus } from "./Status"

export interface Transaction {
	counterpart: Rail.Address & { code?: string }
	currency: isoly.Currency
	amount: Transaction.Amount
	charge?: number
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
	operations?: Operation[]
	status: Transaction.Status
	rail?: Rail
	flags: string[]
	oldFlags: string[]
	notes: Transaction.Note[]
	risk?: number
	state?: Rule.State
}
export namespace Transaction {
	export type Amount = { original: number; reserved: number; charge: number; total: number }
	export namespace Amount {
		export const type = isly.object<Amount>({
			original: isly.number(),
			reserved: isly.number(),
			charge: isly.number(),
			total: isly.number(),
		})
		export function fromState(state: Rule.State): Amount {
			const sign = ["outbound", "authorization", "capture"].some(direction => direction == state.transaction.kind)
				? -1
				: 1
			return {
				original: sign * state.transaction.original.amount,
				reserved: sign * (state.transaction.original.reserve ?? 0),
				charge: sign * (state.transaction.original.charge?.total ?? 0),
				total: sign * state.transaction.original.total,
			}
		}
		export function fromOperations(
			transaction: Transaction | Transaction.Creatable,
			operations: Operation[],
			state?: Rule.State
		): Amount {
			const stateAmount = state && fromState(state)
			const changes = Operation.sum(operations)
			const reserved = isoly.Currency.add(
				transaction.currency,
				changes["reserved-incoming"] ?? 0,
				changes["reserved-outgoing"] ?? 0
			)
			return {
				original: typeof transaction.amount == "number" ? transaction.amount : transaction.amount.original,
				reserved,
				charge: stateAmount?.charge ?? 0,
				total: changes.available ?? reserved ?? 0,
			}
		}
		export function change(
			currency: isoly.Currency,
			amount: Amount,
			change: number,
			type: Exclude<keyof Amount, "total">
		): Amount {
			amount[type] = isoly.Currency.add(currency, amount[type], change)
			amount.total = isoly.Currency.add(currency, amount.total, change)
			return amount
		}
	}
	export const types = ["card", "internal", "external", "system"] as const
	export type Types = typeof types[number]
	export const directions = ["inbound", "outbound"] as const
	export type Direction = typeof directions[number]
	export import Creatable = TransactionCreatable
	export import Incoming = TransactionIncoming
	export import Reference = TransactionReference
	export import Note = TransactionNote
	export import Status = TransactionStatus
	export import Statistics = TransactionStatistics
	export const type = isly.object<Transaction>({
		counterpart: isly.fromIs("Rail.Address", Rail.Address.type.is),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: Amount.type,
		charge: isly.number().optional(),
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
		operations: Operation.type.array().optional(),
		status: Status.type,
		rail: Rail.type.optional(),
		flags: isly.string().array(),
		oldFlags: isly.string().array(),
		notes: Note.type.array(),
		risk: isly.number().optional(),
		state: isly.any().optional(),
	})

	export interface Legacy extends Omit<Transaction, "amount"> {
		amount: number
	}
	export namespace Legacy {
		export const type = Transaction.type.omit<"amount">(["amount"]).extend<Legacy>({ amount: isly.number() })
	}
	export function fromLegacy(transaction: Transaction | Legacy): Transaction {
		return {
			...transaction,
			...(typeof transaction.amount == "number"
				? {
						amount: {
							original:
								transaction.state?.transaction.original.amount ??
								isoly.Currency.subtract(transaction.currency, transaction.amount, transaction.charge ?? 0),
							charge: transaction.state?.transaction.original.charge?.total ?? transaction.charge ?? 0,
							reserved: transaction.state?.transaction.original.reserve ?? 0,
							total: transaction.state?.transaction.original.total ?? transaction.amount,
						},
				  }
				: { amount: transaction.amount }),
		}
	}
	export function toLegacy(transaction: Transaction | Legacy): Legacy {
		return {
			...transaction,
			...(typeof transaction.amount == "number"
				? { amount: transaction.amount }
				: { amount: transaction.amount.total }),
		}
	}
	export type Event = Omit<Transaction, "state">
	export namespace Event {
		export const type = Transaction.type.omit(["state"])

		export function from(transaction: Transaction): Event {
			return (({ state, ...event }) => event)(transaction)
		}
	}
	export function fromCreatable(
		creatable: Creatable.Resolved,
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
			amount: Amount.fromState(state),
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
			status,
			rail,
			flags: state.flags,
			oldFlags: [],
			notes: state.notes,
			state,
			risk: state.transaction.risk,
			...(state.transaction.original.charge && { charge: state.transaction.original.charge.total }),
		}
	}
	export function system(
		creatable: Creatable.Resolved,
		account: { id: string; name: string; organization: string; address: Rail.Address },
		balance: { actual: number; reserved: number; available: number },
		by: string | undefined
	): Transaction {
		return {
			...creatable,
			amount: { original: creatable.amount, reserved: 0, charge: 0, total: creatable.amount },
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
			status: "review",
			rail: "internal",
			flags: [],
			oldFlags: [],
			notes: [],
		}
	}
	export function empty(
		creatable: Creatable.Resolved,
		account: { id: string; name: string; organization: string; address: Rail.Address },
		balance: { actual: number; reserved: number; available: number },
		by: string | undefined
	): Transaction {
		return {
			...creatable,
			amount: { original: 0, reserved: 0, charge: 0, total: 0 },
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
			amount: { original: 0, reserved: 0, charge: 0, total: 0 },
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
		balance: { actual: number; reserved: number; available: number }
	): Transaction {
		const status: Transaction.Status =
			state.outcome == "reject" ? ["rejected", "denied"] : state.outcome == "review" ? "review" : "processing"
		return {
			...transaction,
			amount: Amount.fromState(state),
			type: getType(transaction.counterpart, account.name),
			direction: "inbound",
			organization: account.organization,
			accountId: account.id,
			accountName: account.name,
			balance,
			id,
			status,
			flags: state.flags,
			oldFlags: [],
			notes: state.notes,
			state,
			risk: state.transaction.risk,
			...(state.transaction.original.charge && { charge: state.transaction.original.charge.total }),
		}
	}
	export function fromRefund(
		refund: Settlement.Entry.Creatable.Known & { type: "refund" },
		id: string,
		account: { id: string; name: string; organization: string },
		card: Rail.Address.Card,
		balance: { actual: number; reserved: number; available: number },
		state: Rule.State.Evaluated
	): Transaction {
		return {
			...Incoming.fromRefund(refund, card),
			amount: Amount.fromState(state),
			type: "card",
			direction: "inbound",
			organization: account.organization,
			accountId: account.id,
			accountName: account.name,
			balance,
			id,
			status: "review",
			flags: [],
			oldFlags: [],
			notes: [],
			...(state.transaction.original.charge && { charge: state.transaction.original.charge.total }),
		}
	}
	export function isIdentifier(value: string | any): value is string {
		return typeof value == "string"
	}
	export function flag(transaction: Transaction, flags: string[] | undefined): void {
		const current = new Set<string>(transaction.flags)
		const old = new Set<string>(transaction.oldFlags)
		for (const flag of flags ?? [])
			if (!flag.startsWith("-")) {
				old.delete(flag)
				current.add(flag)
			} else if (current.has(flag.substring(1))) {
				current.delete(flag.substring(1))
				old.add(flag.substring(1))
			}
		transaction.flags = Array.from(current)
		transaction.oldFlags = Array.from(old)
	}
	export function getType(counterpart: Rail.Address, accountName: string): Types {
		let result: Types
		if (
			accountName.startsWith("settlement-") ||
			accountName.startsWith("fee-") ||
			accountName.startsWith("charge-") ||
			accountName.startsWith("net-")
		)
			result = "system"
		else if (counterpart.type == "internal")
			result = "internal"
		else if (counterpart.type == "card")
			result = "card"
		else
			result = "external"
		return result
	}

	const csvMap: Record<string, (transaction: Transaction | Transaction.Legacy) => string | number | undefined> = {
		id: (transaction: Transaction | Transaction.Legacy) => transaction.id,
		created: (transaction: Transaction | Transaction.Legacy) => readableDate(transaction.posted),
		changed: (transaction: Transaction | Transaction.Legacy) => readableDate(transaction.transacted),
		"organization.code": (transaction: Transaction | Transaction.Legacy) => transaction.organization,
		"account.id": (transaction: Transaction | Transaction.Legacy) => transaction.accountId,
		"rail.id": (transaction: Transaction | Transaction.Legacy) => railAddressId(transaction.account),
		"rail.address": (transaction: Transaction | Transaction.Legacy) => railAddress(transaction.account),
		"counterpart.id": (transaction: Transaction | Transaction.Legacy) => railAddressId(transaction.counterpart),
		"counterpart.address": (transaction: Transaction | Transaction.Legacy) => railAddress(transaction.counterpart),
		amount: (transaction: Transaction | Transaction.Legacy) =>
			(typeof transaction.amount == "number" ? transaction.amount : transaction.amount.total).toFixed(
				isoly.Currency.decimalDigits(transaction.currency)
			),
		currency: (transaction: Transaction | Transaction.Legacy) => transaction.currency,
		status: (transaction: Transaction | Transaction.Legacy) =>
			typeof transaction.status == "string" ? transaction.status : transaction.status[0],
		"flags.current": (transaction: Transaction | Transaction.Legacy) => transaction.flags.join(" "),
		"flags.past": (transaction: Transaction | Transaction.Legacy) => transaction.oldFlags.join(" "),
		reason: (transaction: Transaction | Transaction.Legacy) =>
			typeof transaction.status == "string" ? undefined : transaction.status[1],
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
	export function toCsv(transactions: (Transaction | Transaction.Legacy)[]): string {
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
	export type CardTransaction = Transaction & {
		account: Extract<Transaction["account"], Rail.Address.Card>
		counterpart: Extract<Transaction["counterpart"], Rail.Address.Card.Counterpart>
	}
	export namespace CardTransaction {
		export const type = Transaction.type.omit(["account", "counterpart"]).extend<CardTransaction>({
			account: Rail.Address.Card.type,
			counterpart: Rail.Address.Card.Counterpart.type,
		})
	}
}
