import { gracely } from "gracely"
import { http } from "cloudly-http"
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
		return this.client.post<Transaction>(`/transaction/${transaction}/note`, note, {
			organization,
			account,
		})
	}
}
