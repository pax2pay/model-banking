import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Account } from "../../Account"

export class History {
	constructor(private readonly client: http.Client) {}
	async list(account: string): Promise<Account.History[] | gracely.Error> {
		return this.client.get<Account.History[]>(`/account/${account}/history`)
	}
}
