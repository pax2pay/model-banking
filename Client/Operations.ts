import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Operation } from "../Operation"

export class Operations extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async list(start?: string, end?: string): Promise<Operation[] | gracely.Error> {
		const search = start && end ? `?start=${start}&end=${end}` : start ? `?start=${start}` : end ? `?end=${end}` : ""
		return this.client.get<Operation[]>(`/operation${search}`)
	}
}
