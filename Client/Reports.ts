import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Card } from "../Card"

export class Reports {
	constructor(private readonly client: http.Client) {}
	async fetchT140(stack: Card.Stack, id: string): Promise<string | gracely.Error> {
		return this.client.get<string>(`/processor/${stack}/t140/${id}?decrypt`)
	}
}
