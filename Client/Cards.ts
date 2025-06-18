import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Card } from "../Card"

export class Cards {
	constructor(private readonly client: http.Client) {}

	async fetch(card: string): Promise<Card | gracely.Error> {
		// I mean it's supposed to return Card.Storable
		return this.client.get<Card>(`/card/${card}`)
	}
	async create(card: Card.Creatable): Promise<Card | gracely.Error> {
		return this.client.post<Card>("/card", card)
	}
	async list(options?: { limit?: string; cursor?: string }): Promise<(Card[] & { cursor?: string }) | gracely.Error> {
		const search = options && "?" + http.Search.stringify(options)
		return this.client.get<Card[] & { cursor?: string }>(`/card${search ? search : ""}`)
	}
	async update(id: string, card: Card.Changeable): Promise<Card | gracely.Error> {
		return this.client.patch<Card>(`/card/${id}`, card)
	}
	async statistics(
		scheme: Card.Scheme,
		range: isoly.DateRange,
		options?: { limit?: number; cursor?: string }
	): Promise<{ new: number; old: number; withTransaction: number; cursor?: string } | gracely.Error> {
		const queries = http.Search.stringify({ ...options, ...range })
		return this.client.get<{ new: number; old: number; withTransaction: number; cursor?: string }>(
			`/card/statistics/${scheme}?${queries}`
		)
	}
}
