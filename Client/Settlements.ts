import { gracely } from "gracely"
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
	async fetch(id: string): Promise<Settlement | gracely.Error> {
		return this.client.get<Settlement>(`/settlement/${id}`)
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
	async listEntries(settlement: string): Promise<Settlement.Entry[] | gracely.Error> {
		return this.client.get<Settlement.Entry[]>(`/settlement/${settlement}/entry`)
	}
	async listFailedEntries(settlement: string): Promise<Settlement.Entry[] | gracely.Error> {
		return this.client.get<Settlement.Entry[]>(`/settlement/${settlement}/entry/failed`)
	}
}
