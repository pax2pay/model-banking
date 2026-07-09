import { gracely } from "gracely"
import { http } from "cloudly-http"
import { Card } from "../Card"

export class Cards {
	constructor(private readonly client: http.Client) {}

	async fetch(card: string): Promise<Card | gracely.Error> {
		return this.client.get<Card>(`/card/${card}`)
	}
	async create(card: Card.Creatable): Promise<Card | gracely.Error> {
		return this.client.post<Card>("/card", card)
	}
	async list(options?: {
		account?: string
		organization?: string
		scheme?: Card.Scheme
		limit?: number
		cursor?: string
	}): Promise<(Card[] & { cursor?: string }) | gracely.Error> {
		const search = options && "?" + http.Search.stringify(options)
		return this.client.get<Card[] & { cursor?: string }>(`/card${search ? search : ""}`)
	}
	async update(id: string, card: Card.Changeable): Promise<Card | gracely.Error> {
		return this.client.patch<Card>(`/card/${id}`, card)
	}
}
