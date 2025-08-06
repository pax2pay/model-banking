import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Account } from "../../Account"
import { Rail } from "../../Rail"

export class Details {
	constructor(private readonly client: http.Client) {}
	// TODO: fix return type of endpoint
	async create(account: string, details: Account.Details.Creatable): Promise<Rail[] | gracely.Error> {
		return this.client.post<Rail[]>(`/account/${account}/details`, details)
	}
}
