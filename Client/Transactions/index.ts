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
	async list(
		args?:
			| {
					account: string
					search?: {
						currency?: string
						start?: string
						end?: string
						reserved?: boolean
					}
			  }
			| {
					search?: {
						currency?: string
						status?: string
						start?: string
						end?: string
					}
			  }
	): Promise<Transaction[] | gracely.Error> {
		const query = args?.search
			? Object.entries(args.search)
					.map(([k, v]) => `${k}=${v}`)
					.reduce((prev, curr, i) => `${prev}${i == 0 ? "?" : "&"}${curr}`, "")
			: ""
		const path = args && "account" in args ? `/account/${args.account}/transaction${query}` : `/transaction${query}`
		return this.client.get<Transaction[]>(path)
	}
}
