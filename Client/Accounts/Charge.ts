import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Account } from "../../Account"

export class Charge {
	constructor(private readonly client: http.Client) {}
	async create(account: string, charge: Account.Charge.Creatable): Promise<Account.Charge | gracely.Error> {
		return this.client.post<Account.Charge>(`/account/${account}/charge`, charge)
	}
	async remove(account: string, id: string): Promise<Account.Charge | gracely.Error> {
		return this.client.delete<Account.Charge>(`/account/${account}/charge/${id}`)
	}
	async replace(
		account: string,
		id: string,
		charge: Account.Charge.Creatable
	): Promise<Account.Charge | gracely.Error> {
		return this.client.put<Account.Charge>(`/account/${account}/charge/${id}`, charge)
	}
}
