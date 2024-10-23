import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Account } from "../../Account"

export class Status extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async replace(account: string, status: Account.Status): Promise<Account.Status | gracely.Error> {
		return this.client.put<Account.Status>(`/account/${account}/status`, status)
	}
}
