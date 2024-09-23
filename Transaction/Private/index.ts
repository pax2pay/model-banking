import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Identifier } from "../../Identifier"
import { Operation } from "../../Operation"
import { Rail } from "../../Rail"
import { Report } from "../../Report"
import type { Rule } from "../../Rule"
import { Settlement } from "../../Settlement"
import { Creatable as PrivateCreatable } from "./Creatable"
import { Incoming as PrivateIncoming } from "./Incoming"
import { Note as PrivateNote } from "./Note"
import { Reference as PrivateReference } from "./Reference"
import { Status as PrivateStatus } from "./Status"

export interface Private {
	counterpart: Rail.Address & { code?: string }
	currency: isoly.Currency
	amount: number
	charge?: number
	description: string
	organization: string
	accountId: string
	accountName?: string
	account: Rail.Address
	type?: Private.Types
	direction?: Private.Direction
	id: cryptly.Identifier
	reference?: Private.Reference
	posted: isoly.DateTime
	transacted?: isoly.DateTime
	by?: string
	balance: { actual: number; reserved: number; available: number }
	operations: Operation[]
	status: Private.Status
	rail?: Rail
	flags: string[]
	oldFlags: string[]
	notes: Private.Note[]
	risk?: number
	state?: Rule.State
}
export namespace Private {
	export const types = ["card", "internal", "external", "system"] as const
	export type Types = typeof types[number]
	export const directions = ["inbound", "outbound"] as const
	export type Direction = typeof directions[number]
	export import Creatable = PrivateCreatable
	export import Incoming = PrivateIncoming
	export import Reference = PrivateReference
	export import Note = PrivateNote
	export import Status = PrivateStatus
	export const type = isly.object<Private>({
		counterpart: isly.fromIs("Rail.Address", Rail.Address.is),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
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
		balance: isly.object<Private["balance"]>({
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
	export type Event = Omit<Private, "state">
	export namespace Event {
		export const type = Private.type.omit(["state"])
		export const is = type.is
		export const get = type.get
		export function from(transaction: Private): Event {
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
	): Private {
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
	): Private {
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
	): Private {
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
		transaction: Private.Incoming,
		id: string,
		state: Rule.State.Evaluated,
		account: { id: string; name: string; organization: string },
		balance: { actual: number; reserved: number; available: number },
		operation: Operation | undefined
	): Private {
		const status: Private.Status =
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
	): Private {
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
	export function flag(transaction: Private, flags: string[] | undefined): void {
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

	const csvMap: Record<string, (transaction: Private) => string | number | undefined> = {
		id: (transaction: Private) => transaction.id,
		created: (transaction: Private) => readableDate(transaction.posted),
		changed: (transaction: Private) => readableDate(transaction.transacted),
		"organization.code": (transaction: Private) => transaction.organization,
		"account.id": (transaction: Private) => transaction.accountId,
		"rail.id": (transaction: Private) => railAddressId(transaction.account),
		"rail.address": (transaction: Private) => railAddress(transaction.account),
		"counterpart.id": (transaction: Private) => railAddressId(transaction.counterpart),
		"counterpart.address": (transaction: Private) => railAddress(transaction.counterpart),
		amount: (transaction: Private) => transaction.amount.toFixed(isoly.Currency.decimalDigits(transaction.currency)),
		currency: (transaction: Private) => transaction.currency,
		status: (transaction: Private) =>
			typeof transaction.status == "string" ? transaction.status : transaction.status[0],
		"flags.current": (transaction: Private) => transaction.flags.join(" "),
		"flags.past": (transaction: Private) => transaction.oldFlags.join(" "),
		reason: (transaction: Private) => (typeof transaction.status == "string" ? undefined : transaction.status[1]),
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
	export function toCsv(transactions: Private[]): string {
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
