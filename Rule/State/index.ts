import { isly } from "isly"
import { Account as ModelAccount } from "../../Account"
import type { Card as ModelCard } from "../../Card"
import { Rail } from "../../Rail"
import type { Transaction as ModelTransaction } from "../../Transaction"
import type { Rule } from "../index"
import { Account as StateAccount } from "./Account"
import { Authorization as StateAuthorization } from "./Authorization"
import { Card as StateCard } from "./Card"
import { Data as StateData } from "./Data"
import { Organization as StateOrganization } from "./Organization"
import { Partial as StatePartial } from "./Partial"
import { Transaction as StateTransaction } from "./Transaction"

export interface State {
	data: State.Data
	account: State.Account
	transaction: State.Transaction
	authorization?: State.Authorization
	card?: State.Card
	organization?: State.Organization
}
export namespace State {
	export import Partial = StatePartial
	export import Authorization = StateAuthorization
	export import Card = StateCard
	export import Account = StateAccount
	export import Transaction = StateTransaction
	export import Organization = StateOrganization
	export type Data = StateData
	export type Outcome = typeof Outcome.values[number]
	export namespace Outcome {
		export const values = ["approve", "reject", "review"] as const
		export const type = isly.string<Outcome>(values)
	}
	export interface Evaluated extends State {
		outcomes: globalThis.Partial<Record<Rule.Action, Rule[]>>
		outcome: Outcome
		flags: string[]
		notes: ModelTransaction.Note[]
	}
	export function from(
		data: Data,
		account: ModelAccount,
		address: Rail.Address,
		transactions: Account.Transactions,
		days: Account.Days,
		transaction: ModelTransaction.Creatable.Resolved | ModelTransaction,
		kind: Rule.Base.Kind,
		stage: "finalize" | "initiate",
		card?: Card,
		organization?: Organization
	): State {
		return {
			data,
			account: Account.from(account, address, transactions, days),
			transaction: Transaction.from(account.name, transaction, kind, stage),
			authorization: Authorization.from(transaction),
			card,
			organization,
		}
	}
	export const type: Record<ModelTransaction.PreTransaction["type"], Rule.Base.Kind> = {
		authorization: "authorization",
		incoming: "inbound",
		outgoing: "outbound",
	}
	export function fromPreTransaction(
		data: Data,
		account: ModelAccount,
		address: Rail.Address,
		transactions: Account.Transactions,
		days: Account.Days,
		transaction: ModelTransaction.PreTransaction,
		card?: ModelCard & { statistics: Card.Statistics },
		organization?: Organization
	): State {
		return {
			data,
			account: Account.from(account, address, transactions, days),
			transaction: Transaction.from(account.name, transaction, type[transaction.type], "initiate"),
			card: card ? Card.from(card, card.statistics) : undefined,
			organization,
		}
	}
}
