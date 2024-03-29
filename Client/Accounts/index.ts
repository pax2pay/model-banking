import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Account } from "../../Account"
import { Rails } from "./Rails"

export class Accounts extends rest.Collection<gracely.Error> {
	readonly Rails = new Rails(this.client)
	constructor(client: http.Client) {
		super(client)
	}
	async create(account: Account.Creatable): Promise<Account | gracely.Error> {
		return this.client.post<Account>("/account", account)
	}
	async list(options?: {
		limit?: string
		cursor?: string
	}): Promise<(Account[] & { cursor?: string | undefined }) | gracely.Error> {
		return this.client.get<Account[] & { cursor?: string | undefined }>("/account", options)
	}
}
