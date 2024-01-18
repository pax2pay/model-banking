import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Transaction } from "../../Transaction"
import { Notes } from "./Notes"

export class Transactions extends rest.Collection<gracely.Error> {
	readonly Notes = new Notes(this.client)
	constructor(client: http.Client) {
		client.postprocess = async response => {
			let result = response
			const body = await response.body
			if (Array.isArray(body)) {
				result = http.Response.create(Object.defineProperty(body, "cursor", { value: response.header.cursor }))
			}
			return result
		}
		super(client)
	}
	async create(account: string, transaction: Transaction.Creatable): Promise<Transaction | gracely.Error> {
		return this.client.post<Transaction>(`/account/${account}/transaction`, transaction)
	}
	async list(options?: {
		account?: string
		limit?: number
		cursor?: string
		index?: "review"
		dateRange?: isoly.DateRange
	}): Promise<(Transaction[] & { cursor?: string | undefined }) | gracely.Error> {
		const query = Object.entries({
			...(options?.cursor ? { cursor: options.cursor } : {}),
			...(options?.index ? { index: options?.index } : {}),
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
}
