import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Operation } from "../../Operation"
import { Rail } from "../../Rail"
import { Rule } from "../../Rule"
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
	async list(options?: string | Transactions.Query): Promise<(Transaction[] & { cursor?: string }) | gracely.Error> {
		const query = !options
			? undefined
			: typeof options == "string"
				? options
				: http.Search.stringify({ ...options, references: options.references?.join(",") })
		return await this.client.get<Transaction[] & { cursor?: string | undefined }>(
			"/transaction" + (query ? "?" + query : "")
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
}
export namespace Transactions {
	export interface Query {
		id?: string
		account?: string
		limit?: number
		cursor?: string
		start?: isoly.DateTime
		end?: isoly.DateTime
		currency?: string
		organization?: string
		references?: string[]
		rail?: Rail
		type?: Transaction.Types
	}
}
