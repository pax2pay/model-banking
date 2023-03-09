import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Transaction } from "../Transaction"

export class Comments extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async create(transaction: string, comment: Transaction.Comment): Promise<Transaction | gracely.Error> {
		return this.client.post<Transaction>(`/transaction/${transaction}/comment`, comment)
	}
}
