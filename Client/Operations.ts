import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Operation } from "../Operation"

export class Operations extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async list(realm: string): Promise<Operation[] | gracely.Error> {
		return this.client.get<Operation[]>(`/operation/${realm}`)
	}
}
