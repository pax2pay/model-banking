import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Rule } from "../../Rule"

export class Rules {
	constructor(private readonly client: http.Client) {}
	async create(account: string, rule: Rule): Promise<Rule | gracely.Error> {
		return this.client.post<Rule>(`/account/${account}/rule`, rule)
	}
	async replace(account: string, rule: Rule): Promise<Rule | gracely.Error> {
		return this.client.put<Rule>(`/account/${account}/rule/${rule.code}`, rule)
	}
	async remove(account: string, code: string): Promise<Rule | gracely.Error> {
		return this.client.delete<Rule>(`/account/${account}/rule/${code}`)
	}
}
