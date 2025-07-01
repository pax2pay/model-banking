import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { isly } from "isly2"
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
	async list(options?: string | Transactions.Query): Promise<(Transaction[] & { cursor?: string }) | gracely.Error> {
		const query = !options ? undefined : typeof options == "string" ? options : http.Search.stringify({ ...options })
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
	async statistics(
		range: isoly.DateRange,
		queries?: { cursor?: string; scheme?: Card.Scheme; supplier?: Supplier; limit?: number }
	): Promise<Transaction.Statistics | gracely.Error> {
		const query = "?" + http.Search.stringify({ ...queries, ...range })
		return this.client.get<Transaction.Statistics>(`/transaction/statistics${query}`)
	}
}
export namespace Transactions {
	export interface Query {
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
	export namespace Query {
		export const type = isly.object({
			account: isly.string().optional(),
			limit: isly.number().optional(),
			cursor: isly.string().optional(),
			start: isly.string().optional(),
			end: isly.string().optional(),
			currency: isly.string().optional(),
			organization: isly.string().optional(),
			rail: Rail.type2.optional(),
			type: isly.string("value", ...Transaction.types).optional(),
		})
		export function parse(query: string | http.Request["search"]): Query {
			if (typeof query == "string")
				query = query ? http.Search.parse(query.replace("?", "")) : {} // search.parse does not support empty string
			return type.prune(query) ?? {}
		}
	}
}
