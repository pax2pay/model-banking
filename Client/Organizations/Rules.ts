import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Rule } from "../../Rule"

export class Rules extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async replace(organization: string, rules: Rule[]): Promise<Rule[] | gracely.Error> {
		return this.client.put<Rule[]>(`/organization/rule`, rules, {
			organization: organization,
		})
	}
}
