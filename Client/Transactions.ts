import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Transaction } from "../Transaction"

export class Transactions extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async create(
		organization: string,
		account: string,
		transaction: Transaction.Creatable
	): Promise<Transaction | gracely.Error> {
		return this.client.post<Transaction>(`/account/${account}/transaction`, transaction, { organization: organization })
	}
	async list(organization: string, account: string): Promise<Transaction[] | gracely.Error> {
		return this.client.get<Transaction[]>(`/account/${account}/transaction`, { organization: organization })
	}
}
