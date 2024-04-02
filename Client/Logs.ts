import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Log } from "../Log"

export class Logs {
	constructor(private readonly client: http.Client) {}
	async list(resource?: Log.Resource): Promise<Log[] | gracely.Error> {
		return this.client.get<Log[]>(`/audit/${resource}`)
	}
}
