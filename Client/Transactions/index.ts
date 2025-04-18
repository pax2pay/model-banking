import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Card } from "../../Card"
import { Operation } from "../../Operation"
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
	async list(options?: {
		account?: string
		limit?: number
		cursor?: string
		query?: "created" | "changed" | "review"
		dateRange?: isoly.DateRange
	}): Promise<(Transaction[] & { cursor?: string | undefined }) | gracely.Error> {
		const query = Object.entries({
			...(options?.cursor ? { cursor: options.cursor } : {}),
			...(!options?.query ? {} : options?.query == "review" ? { status: "review" } : { order: options?.query }),
			...(options?.dateRange ?? {}),
		})
			.map(([k, v]) => `${k}=${v}`)
			.join("&")
		const path = options?.account ? `/account/${options.account}/transaction` : `/transaction`
		return await this.client.get<Transaction[] & { cursor?: string | undefined }>(
			path + (query && "?" + query),
			options?.limit ? { limit: options?.limit.toString() } : {}
		)
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
