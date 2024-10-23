import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Account } from "../../Account"

export class Status {
	constructor(private readonly client: http.Client) {}
	async replace(account: string, status: Account.Status): Promise<Account.Status | gracely.Error> {
		return this.client.put<Account.Status>(`/account/${account}/status`, status)
	}
}
