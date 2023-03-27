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
		limit?: number
		cursor?: string
		status?: "review" | "created" | "approved" | "rejected" | "processing" | "finalized"
		currency?: string
		direction?: "inbound" | "outbound"
		rail?: "internal"
		start?: string
		end?: string
	}): Promise<Transaction[] | gracely.Error> {
		const searchOptions = options && (({ account, limit, cursor, ...search }) => search)(options)
		const query = searchOptions
			? Object.entries(searchOptions)
					.map(([k, v]) => `${k}=${v}`)
					.reduce((prev, curr, i) => `${prev}${i == 0 ? "?" : "&"}${curr}`, "")
			: ""
		const path = options && options.account ? `/account/${options.account}/transaction${query}` : `/transaction${query}`
		return this.client.get<Transaction[]>(path) //{ limit: options?.limit ? options.limit.toString() : undefined, cursor: options?.cursor, }
	}
}
