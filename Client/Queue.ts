import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Reviewable } from "../monitoring/Reviewable"

export class Queue extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async change(realm: string, transaction: string, comment: string): Promise<Reviewable | gracely.Error> {
		return this.client.patch<Reviewable>(`/monitor/queue/${transaction}`, comment, { realm: realm })
	}
	async list(realm: string): Promise<Reviewable[] | gracely.Error> {
		return this.client.get<Reviewable[]>(`/monitor/queue`, { realm: realm })
	}
}
