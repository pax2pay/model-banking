import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Account } from "../../Account"

export class Details {
	constructor(private readonly client: http.Client) {}

	async create(account: string, details: Account.Details.Creatable): Promise<Account.Details | gracely.Error> {
		return this.client.post<Account.Details>(`/account/${account}/details`, details)
	}
}
