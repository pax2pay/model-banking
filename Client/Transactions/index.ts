import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Card } from "../../Card"
import { Supplier } from "../../Supplier"
import { Transaction } from "../../Transaction"
import { Notes } from "./Notes"

export class Transactions extends rest.Collection<gracely.Error> {
	readonly Notes = new Notes(this.client)
	constructor(client: http.Client) {
		super(client)
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
			detailed: "true",
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
			account
				? `/account/${account}/transaction/${transaction}?detailed=true`
				: `/transaction/${transaction}?detailed=true`
		)
	}
	async statistics(
		range: isoly.DateRange,
		queries?: { cursor?: string; scheme?: Card.Scheme; supplier?: Supplier }
	): Promise<Transaction.Statistics | gracely.Error> {
		const query = "?" + http.Search.stringify({ ...queries, ...range })
		return this.client.get<Transaction.Statistics>(`/transaction/statistics${query}`)
	}
}
