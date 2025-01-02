import { http } from "cloudly-http"

export class Version {
	constructor(readonly client: http.Client) {}

	async fetch() {
		return this.client.get<any>("/version")
	}
}
