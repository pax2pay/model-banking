import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Rail } from "../../Rail"
export class Rails extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async create(organization: string, account: string, supplier: string): Promise<Rail | gracely.Error> {
		return this.client.post<Rail>(`/api/account/${account}/rail`, supplier, {
			organization: organization,
			account: account,
		})
	}
}
