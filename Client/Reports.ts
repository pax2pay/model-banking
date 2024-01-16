import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Card } from "../Card"

export class Reports extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async fetchT140(stack: Card.Stack, id: string): Promise<string | gracely.Error> {
		return this.client.get<string>(`/processor/${stack}/t140/${id}?decrypt`)
	}
}
