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
	async list(account?: string): Promise<Transaction[] | gracely.Error> {
		const path = account ? `/account/${account}/transaction` : "/transaction"
		return this.client.get<Transaction[]>(path)
	}
}
