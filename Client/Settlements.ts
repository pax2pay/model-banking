import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Settlement } from "../Settlement"

export class Settlements extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}

	async fetch(settlement: string): Promise<Settlement | gracely.Error> {
		return this.client.get<Settlement>(`/card/settlement/${settlement}`)
	}
	async list(): Promise<Settlement.Summary | gracely.Error> {
		return this.client.get<Settlement.Summary & { cursor?: string | undefined }>(`/card/settlement`)
	}
	async settle(settlement: string): Promise<Settlement | gracely.Error> {
		return this.client.patch<Settlement>(`/card/settlement/${settlement}`, {})
	}
}
