import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Flag } from "../Flag"

export class Flags {
	constructor(private readonly client: http.Client) {}
	async replace(flag: Flag): Promise<Flag | gracely.Error> {
		return this.client.put(`/flag/${flag.name}`, flag)
	}
	async list(): Promise<Flag[] | gracely.Error> {
		return this.client.get("/flag")
	}
	async remove(name: string): Promise<Flag | gracely.Error> {
		return this.client.delete(`/flag/${name}`)
	}
}
