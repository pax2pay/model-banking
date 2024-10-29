import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Card } from "../Card"

export class Cards extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}

	async fetch(card: string): Promise<Card | gracely.Error> {
		// I mean it's supposed to return Card.Storable
		return this.client.get<Card>(`/card/${card}`)
	}
	async create(card: Card.Creatable): Promise<Card | gracely.Error> {
		return this.client.post<Card>("/card", card)
	}
	async list(options?: {
		start?: string
		end?: string
		limit?: string
		cursor?: string
		prefix?: string
	}): Promise<(Card[] & { cursor?: string | undefined }) | gracely.Error> {
		// I mean it's supposed to return Card.Static
		const search =
			options?.start && options?.end
				? `?start=${options?.start}&end=${options?.end}`
				: options?.start
				? `?start=${options?.start}`
				: options?.end
				? `?end=${options?.end}`
				: ""
		return this.client.get<Card[] & { cursor?: string | undefined }>(
			`/card${search}`,
			options && (({ start, end, ...headers }) => headers)(options)
		)
	}
	async update(id: string, card: Card.Changeable): Promise<Card | gracely.Error> {
		return this.client.patch<Card>(`/card/${id}`, card)
	}
	async statistics(
		scheme: Card.Scheme,
		range: isoly.DateRange,
		options?: { limit: number; cursor?: string }
	): Promise<{ new: number; old: number; withTransaction: number; cursor?: string } | gracely.Error> {
		const queries = options && http.Search.stringify({ ...options, start: range.start, end: range.end })
		return this.client.get<{ new: number; old: number; withTransaction: number; cursor?: string }>(
			`/card/statistics/${scheme}?${queries}`
		)
	}
}
