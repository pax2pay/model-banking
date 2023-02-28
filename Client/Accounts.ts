import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Account } from "../Account"

export class Accounts extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async create(account: Account.Creatable): Promise<Account | gracely.Error> {
		return this.client.post<Account>("/account", account)
	}
	async list(organization: string): Promise<Account.Info[] | gracely.Error> {
		return this.client.get<Account.Info[]>("/account", { organization: organization })
	}
}
