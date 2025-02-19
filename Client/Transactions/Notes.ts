import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Transaction } from "../../Transaction"

export class Notes {
	constructor(private readonly client: http.Client) {}
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
