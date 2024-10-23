import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Account } from "../../Account"

export class History extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async list(account: string, status: Account.Status): Promise<Account.History[] | gracely.Error> {
		return this.client.get<Account.History[]>(`/account/${account}/history`)
	}
}
