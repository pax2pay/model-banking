import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Transaction } from "../../Transaction"

export class Notes extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async create(
		organization: string,
		account: string,
		transaction: string,
		note: Transaction.Note.Creatable
	): Promise<Transaction | gracely.Error> {
		return this.client.post<Transaction>(`/api/transaction/${transaction}/note`, note, {
			organization: organization,
			account: account,
		})
	}
}
