import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Organization } from "../../Organization"

export class Fx {
	constructor(private readonly client: http.Client) {}
	async markup(organization: string, markup: number): Promise<Organization | gracely.Error> {
		return this.client.put<Organization>(`/organization/markup`, { markup }, { organization })
	}
}
