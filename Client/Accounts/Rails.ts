import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Rail } from "../../Rail"
import { Supplier } from "../../Supplier"

export class Rails extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async create(account: string, supplier: Supplier): Promise<Rail | gracely.Error> {
		return this.client.post<Rail>(`/api/account/${account}/rail`, supplier)
	}
}
