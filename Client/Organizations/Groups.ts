import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Label } from "../../Label"

export class Groups extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async replace(organization: string, groups: Label[]): Promise<Label[] | gracely.Error> {
		return this.client.put<Label[]>(`/organization/label`, groups, {
			organization,
		})
	}
}
