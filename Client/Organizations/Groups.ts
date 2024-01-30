import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"

export class Groups extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async replace(organization: string, groups: string[]): Promise<string[] | gracely.Error> {
		return this.client.put<string[]>(`/organization/group`, groups, {
			organization,
		})
	}
}
