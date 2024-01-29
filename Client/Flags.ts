import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Label } from "../Label"

export class Flags {
	constructor(private readonly client: http.Client) {}
	async create(flag: Label): Promise<Label | gracely.Error> {
		return this.client.post<Label>("/flag", flag)
	}
	async replace(flag: Label): Promise<Label | gracely.Error> {
		return this.client.put<Label>("/flag", flag)
	}
	async list(): Promise<Label[] | gracely.Error> {
		return this.client.get<Label[]>("/flag")
	}
	async remove(name: string): Promise<Label | gracely.Error> {
		return this.client.delete(`/flag/${name}`)
	}
}
