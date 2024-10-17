import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Settlement } from "../Settlement"

export class Settlements {
	constructor(private readonly client: http.Client) {}

	async create(configuration: string): Promise<Settlement | gracely.Error> {
		return this.client.post<Settlement>(`/settlement`, { configuration: configuration })
	}
	async fetch(id: string): Promise<Settlement | gracely.Error> {
		return this.client.get<Settlement>(`/settlement/${id}`)
	}
	async list(options?: {
		limit?: number
		cursor?: string
	}): Promise<(Settlement[] & { cursor?: string }) | gracely.Error> {
		return this.client.get<Settlement[] & { cursor?: string | undefined }>(
			`/settlement${options?.cursor ? `?cursor=${options.cursor}` : ""}`,
			options?.limit ? { limit: options?.limit.toString() } : {}
		)
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
	async addPayoutTransactions(settlement: string, transactions: string[]): Promise<Settlement | gracely.Error> {
		return this.client.patch<Settlement>(`/settlement/${settlement}/settled`, transactions)
	}
}
