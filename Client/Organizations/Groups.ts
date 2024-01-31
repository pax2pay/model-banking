import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Organization } from "../../Organization"

export class Groups extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async replace(organization: string, groups: string[]): Promise<Organization | gracely.Error> {
		return this.client.put<Organization>(`/organization/group`, groups, {
			organization,
		})
	}
}
