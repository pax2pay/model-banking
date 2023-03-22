import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
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
		status?: "review" | "created" | "approved" | "rejected" | "processing" | "finalized"
		currency?: string
		start?: string
		end?: string
		limit?: number
		cursor?: string
	}): Promise<Transaction[] | gracely.Error> {
		let query = ""
		query += options?.currency ? `currency=${options?.currency}` : ""
		query += options?.status ? `status=${options?.status}` : ""
		query += options?.start ? `start=${options?.start}` : ""
		query += options?.end ? `end=${options?.end}` : ""
		const path = options && options.account ? `/account/${options.account}/transaction${query}` : `/transaction${query}`
		return this.client.get<Transaction[]>(path, {
			limit: options?.limit ? options.limit.toString() : undefined,
			cursor: options?.cursor,
		})
	}
}
