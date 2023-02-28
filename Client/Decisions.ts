import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Decision } from "../monitoring/Decision"

export class Decisions extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async create(realm: string, transaction: string, decision: Decision.Creatable): Promise<Decision | gracely.Error> {
		return this.client.post<Decision>(`/monitor/decision/${transaction}`, decision, { realm: realm })
	}
	async list(realm: string): Promise<Decision[] | gracely.Error> {
		return this.client.get<Decision[]>(`/monitor/decision`, { realm: realm })
	}
}
