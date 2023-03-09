import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Transaction } from "../Transaction"
import { Comments } from "./Comments"

export class Transactions extends rest.Collection<gracely.Error> {
	readonly comments = new Comments(this.client)
	constructor(client: http.Client) {
		super(client)
	}
	async create(account: string, transaction: Transaction.Creatable): Promise<Transaction | gracely.Error> {
		return this.client.post<Transaction>(`/account/${account}/transaction`, transaction)
	}
	async list(account: string): Promise<Transaction[] | gracely.Error> {
		return this.client.get<Transaction[]>(`/account/${account}/transaction`)
	}
}
