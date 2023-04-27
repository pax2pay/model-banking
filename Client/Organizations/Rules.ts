import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Organization } from "../../Organization"

export class Rules extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async replace(organization: string, rules: Organization.Rule[]): Promise<Organization.Rule[] | gracely.Error> {
		return this.client.put<Organization.Rule[]>(`/api/organization/rule`, rules, {
			organization: organization,
		})
	}
}
