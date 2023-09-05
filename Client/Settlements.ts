import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Settlement } from "../Settlement"

export class Settlements extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}

	async create(configuration: string): Promise<Settlement | gracely.Error> {
		return this.client.post<Settlement>(`/settlement`, { configuration: configuration })
	}
	async fetch(id: string, created: isoly.DateTime): Promise<Settlement | gracely.Error> {
		return this.client.get<Settlement>(`/settlement/${id}?created=${created}`)
	}
	async list(): Promise<Settlement[] | gracely.Error> {
		return this.client.get<Settlement[] & { cursor?: string | undefined }>(`/settlement`)
	}
	async remove(settlement: string): Promise<Settlement | gracely.Error> {
		return this.client.delete<Settlement>(`/settlement/${settlement}`)
	}
	async update(settlement: string): Promise<Settlement | gracely.Error> {
		return this.client.patch<Settlement>(`/settlement/${settlement}`, {})
	}
}
