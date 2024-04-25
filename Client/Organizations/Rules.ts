import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Rule } from "../../Rule"

export class Rules {
	constructor(private readonly client: http.Client) {}
	async create(organization: string, rule: Rule): Promise<Rule | gracely.Error> {
		return this.client.post<Rule>(`/organization/rule`, rule, {
			organization,
		})
	}
	async replace(organization: string, rule: Rule): Promise<Rule | gracely.Error> {
		return this.client.put<Rule>(`/organization/rule/${rule.code}`, rule, {
			organization,
		})
	}
	async remove(organization: string, code: string): Promise<Rule | gracely.Error> {
		return this.client.delete<Rule>(`/organization/rule/${code}`, {
			organization,
		})
	}
}
