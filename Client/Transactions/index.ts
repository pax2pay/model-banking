import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Card } from "../../Card"
import { Operation } from "../../Operation"
import { Rail } from "../../Rail"
import { Rule } from "../../Rule"
import { Supplier } from "../../Supplier"
import { Transaction } from "../../Transaction"
import { Notes } from "./Notes"

export class Transactions {
	readonly Notes: Notes
	constructor(private readonly client: http.Client) {
		this.Notes = new Notes(this.client)
	}

	async create(account: string, transaction: Transaction.Creatable): Promise<Transaction | gracely.Error> {
		return this.client.post<Transaction>(`/account/${account}/transaction`, transaction)
	}
	async list(
		options?:
			| {
					account?: string
					limit?: number
					cursor?: string
					start?: isoly.DateTime
					end?: isoly.DateTime
					currency?: string
					organization?: string
					rail?: Rail
					type?: Transaction.Types
			  }
			| string
	): Promise<(Transaction[] & { cursor?: string | undefined }) | gracely.Error> {
		const path = `/transaction`
		const query = !options ? undefined : typeof options == "string" ? options : http.Search.stringify({ ...options })
		return await this.client.get<Transaction[] & { cursor?: string | undefined }>(path + (query && "?" + query))
	}
	async fetch(transaction: string, account?: string): Promise<Transaction | gracely.Error> {
		return this.client.get<Transaction>(
			account ? `/account/${account}/transaction/${transaction}` : `/transaction/${transaction}`
		)
	}
	async getOperations(transactionId: string): Promise<Operation[] | gracely.Error> {
		return this.client.get<Operation[]>(`/transaction/${transactionId}/operation`)
	}
	async getState(transactionId: string): Promise<Rule.State | gracely.Error> {
		return this.client.get<Rule.State>(`/transaction/${transactionId}/state`)
	}
	async statistics(
		range: isoly.DateRange,
		queries?: { cursor?: string; scheme?: Card.Scheme; supplier?: Supplier; limit?: number }
	): Promise<Transaction.Statistics | gracely.Error> {
		const query = "?" + http.Search.stringify({ ...queries, ...range })
		return this.client.get<Transaction.Statistics>(`/transaction/statistics${query}`)
	}
}
