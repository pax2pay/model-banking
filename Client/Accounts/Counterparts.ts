import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Rail } from "../../Rail"

export class Counterparts {
	constructor(private readonly client: http.Client) {}
	async replace(account: string, code: string, address: Rail.Address): Promise<Rail.Address | gracely.Error> {
		return this.client.put<Rail.Address>(`/account/${account}/counterpart/${code}`, address)
	}
	async remove(account: string, code: string): Promise<Rail.Address | gracely.Error> {
		return this.client.delete<Rail.Address>(`/account/${account}/counterpart/${code}`)
	}
}
