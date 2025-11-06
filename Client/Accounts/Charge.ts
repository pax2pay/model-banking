import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Account } from "../../Account"

export class Charge {
	constructor(private readonly client: http.Client) {}
	async replace(account: string, charge: Account.Charge): Promise<Account.Charge | gracely.Error> {
		return this.client.put<Account.Charge>(`/account/${account}/charge/`, charge)
	}
}
