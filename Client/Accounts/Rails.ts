import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Rail } from "../../Rail"
import { Supplier } from "../../Supplier"

export class Rails {
	constructor(private readonly client: http.Client) {}
	async create(account: string, supplier: Supplier): Promise<Rail | gracely.Error> {
		return this.client.post<Rail>(`/account/${account}/rail`, supplier)
	}
}
