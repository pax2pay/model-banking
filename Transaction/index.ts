import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { fx } from "../fx"
import { Operation } from "../Operation"
import { Rail } from "../Rail"
import { Report } from "../Report"
import type { Rule } from "../Rule"
import { Settlement } from "../Settlement"
import { zod } from "../zod"
import { Amount as TransactionAmount } from "./Amount"
import { Creatable as TransactionCreatable } from "./Creatable"
import { Exchange as TransactionExchange } from "./Exchange"
import { Identifier as TransactionIdentifier } from "./Identifier"
import { Note as TransactionNote } from "./Note"
import { PreTransaction as TransactionPreTransaction } from "./PreTransaction"
import { Reference as TransactionReference } from "./Reference"
import { Status as TransactionStatus } from "./Status"

export interface Transaction {
	counterpart: Rail.Address & { code?: string }
	currency: isoly.Currency
	amount: Transaction.Amount
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
	export import Identifier = TransactionIdentifier
	export import Exchange = TransactionExchange
	export import Amount = TransactionAmount
	export const types = ["card", "internal", "external", "system"] as const
	export type Types = (typeof types)[number]
	export const directions = ["inbound", "outbound"] as const
	export type Direction = (typeof directions)[number]
	export import Creatable = TransactionCreatable
	export import PreTransaction = TransactionPreTransaction
	export import Reference = TransactionReference
	export import Note = TransactionNote
	export import Status = TransactionStatus
	export const type = isly.object<Transaction>({
		counterpart: isly.fromIs("Rail.Address", Rail.Address.type.is),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: Amount.type,
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
	export const typeZod: zod.ZodType<Transaction> = zod.object({
		counterpart: Rail.Address.typeZod,
		currency: zod.enum(isoly.Currency.values),
		amount: Amount.typeZod,
		description: zod.string(),
		organization: zod.string(),
		accountId: zod.string(),
		accountName: zod.string().optional(),
		account: Rail.Address.typeZod,
		type: zod.enum(types).optional(),
		direction: zod.enum(directions).optional(),
		id: Identifier.typeZod,
		reference: Reference.typeZod.optional(),
		posted: zod.string().refine(isoly.DateTime.is),
		transacted: zod.string().refine(isoly.DateTime.is).optional(),
		by: zod.string().optional(),
		balance: zod.object({ actual: zod.number(), available: zod.number(), reserved: zod.number() }),
		operations: zod.array(Operation.typeZod).optional(),
		status: Status.typeZod,
		rail: Rail.typeZod.optional(),
		flags: zod.array(zod.string()),
		oldFlags: zod.array(zod.string()),
		notes: zod.array(Note.typeZod),
		risk: zod.number().optional(),
		state: zod.any().optional(),
	})
	export function amountFromOperations(transaction: Transaction, operations: Operation[]): Amount {
		const changes = Operation.sum(operations)
		const reserved = isoly.Currency.add(
			transaction.currency,
			changes["reserved-incoming"] ?? 0,
			changes["reserved-outgoing"] ?? 0
		)
		return {
			original: typeof transaction.amount == "number" ? transaction.amount : transaction.amount.original,
			charge: 0,
			charges: transaction.amount.charges,
			total: changes.available ?? reserved ?? 0,
			exchange: transaction.amount.exchange,
		}
	}
	export interface Legacy extends Omit<Transaction, "amount"> {
		amount: number
	}
	export function fromLegacy(transaction: Transaction | Legacy): Transaction {
		return {
			...transaction,
			...(typeof transaction.amount == "number"
				? {
						amount: {
							original: transaction.state?.transaction.original.amount ?? transaction.amount,
							charge: 0,
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
		charges?: Amount.Charge,
		by?: string,
		quote?: fx.Quote
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
			amount: {
				original: -creatable.amount,
				charge: 0,
				charges: charges ?? (quote && fx.Quote.toCharge(quote)),
				total: -isoly.Currency.add(
					creatable.currency,
					creatable.amount,
					Amount.Charge.total(creatable.currency, charges ?? {})
				),
				exchange: creatable.exchange,
			},
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
			amount: { original: 0, charge: 0, total: 0 },
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
	export function fromIncoming(
		transaction: Transaction.PreTransaction.Incoming,
		state: Rule.State.Evaluated,
		account: { id: string; name: string; organization: string },
		balance: { actual: number; reserved: number; available: number }
	): Transaction {
		const status: Transaction.Status =
			state.outcome == "reject" ? ["rejected", "denied"] : state.outcome == "review" ? "review" : "processing"
		return {
			...transaction,
			amount: {
				original: transaction.amount,
				charge: 0,
				total: transaction.amount,
				exchange: state?.transaction.exchange ?? state.authorization?.exchange,
			},
			type: getType(transaction.counterpart, account.name),
			direction: "inbound",
			organization: account.organization,
			accountId: account.id,
			accountName: account.name,
			balance,
			id: state.transaction.id,
			status,
			flags: state.flags,
			oldFlags: [],
			notes: state.notes,
			state,
		}
	}
	export function fromRefund(
		id: string,
		card: Rail.Address.Card,
		refund: Settlement.Entry.Creatable.Refund,
		account: { id: string; name: string; organization: string },
		balance: { actual: number; reserved: number; available: number }
	): CardTransaction {
		const original = isoly.Currency.add(
			refund.amount[0],
			Math.abs(refund.amount[1]),
			Math.abs(refund.fee.other[refund.amount[0]] ?? 0)
		)
		return {
			id,
			type: "card",
			status: "review",
			posted: isoly.DateTime.now(),
			account: card,
			direction: "inbound",
			currency: refund.amount[0],
			amount: { charge: 0, original, total: original },
			counterpart: { type: "card", merchant: refund.merchant, acquirer: refund.acquirer },
			accountId: account.id,
			accountName: account.name,
			organization: account.organization,
			balance,
			rail: card.scheme,
			notes: [],
			flags: [],
			oldFlags: [],
			reference: { reference: refund.reference },
			description: "Refund transaction.",
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
		if (
			accountName.startsWith("settlement-") ||
			accountName.startsWith("settlements") ||
			accountName.startsWith("fee-") ||
			accountName.startsWith("net-") ||
			accountName.startsWith("interchange-") ||
			accountName.startsWith("collect-")
		) {
			result = "system"
		} else if (counterpart.type == "internal") {
			result = "internal"
		} else if (counterpart.type == "card") {
			result = "card"
		} else {
			result = "external"
		}
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
		export const typeZod: zod.ZodType<CardTransaction> = Transaction.typeZod
			.omit({ account: true, counterpart: true })
			.extend({
				account: Rail.Address.Card.typeZod,
				counterpart: Rail.Address.Card.Counterpart.typeZod,
			})
	}
}
