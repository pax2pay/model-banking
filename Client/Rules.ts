import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Rule } from "../Rule"

export class Rules {
	constructor(private readonly client: http.Client) {}
	async create(rule: Rule): Promise<Rule | gracely.Error> {
		return this.client.post<Rule>(`/rule`, rule)
	}
	async list(): Promise<Rule[] | gracely.Error> {
		return this.client.get<Rule[]>(`/rule`)
	}
	async replace(rule: Rule): Promise<Rule | gracely.Error> {
		return this.client.put<Rule>(`/rule/${rule.code}`, rule)
	}
	async remove(code: string): Promise<Rule | gracely.Error> {
		return this.client.delete<Rule>(`/rule/${code}`)
	}
}
