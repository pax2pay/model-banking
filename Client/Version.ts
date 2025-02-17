import { http } from "cloudly-http"

export class Version {
	constructor(private readonly client: http.Client) {}
	async fetch() {
		return this.client.get<any>("/version")
	}
}
