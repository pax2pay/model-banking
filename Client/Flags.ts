import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Flag } from "../Flag"

export class Flags {
	constructor(private readonly client: http.Client) {}
	async create(flag: Flag): Promise<Flag | gracely.Error> {
		return this.client.post<Flag>("/flag", flag)
	}
	async replace(flag: Flag): Promise<Flag | gracely.Error> {
		return this.client.put<Flag>("/flag", flag)
	}
	async list(): Promise<Flag[] | gracely.Error> {
		return this.client.get<Flag[]>("/flag")
	}
	async remove(name: string): Promise<Flag | gracely.Error> {
		return this.client.delete(`/flag/${name}`)
	}
}
