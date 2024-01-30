import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Label } from "../Label"

export class Labels {
	constructor(private readonly client: http.Client, readonly type: Label.Type) {}
	async create(label: Label): Promise<Label | gracely.Error> {
		return this.client.post<Label>(`/label/${this.type}`, label)
	}
	async replace(label: Label): Promise<Label | gracely.Error> {
		return this.client.put<Label>(`/label/${this.type}`, label)
	}
	async list(): Promise<Label[] | gracely.Error> {
		return this.client.get<Label[]>(`/label/${this.type}`)
	}
	async remove(name: string): Promise<Label | gracely.Error> {
		return this.client.delete(`/label/${this.type}/${name}`)
	}
}
