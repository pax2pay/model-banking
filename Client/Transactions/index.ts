import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Transaction } from "../../Transaction"
import { Indices as TransactionIndex } from "./Indices"
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
		index?: Transactions.Index
		dateRange?: isoly.DateRange
	}): Promise<(Transaction[] & { cursor?: string | undefined }) | gracely.Error> {
		const query = Object.entries({
			...(options?.index ? { index: options.index.join(",") } : {}),
			...(options?.dateRange ?? {}),
		})
			.map(([k, v]) => `${k}=${v}`)
			.join("&")
		const path = options?.account ? `/account/${options.account}/transaction` : `/transaction`
		return this.client.get<Transaction[] & { cursor?: string | undefined }>(
			path + (query && "?" + query),
			options?.limit ? { limit: options?.limit.toString() } : {}
		)
	}
}

export namespace Transactions {
	export type Index = TransactionIndex
	export const Index = TransactionIndex
}
