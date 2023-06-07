import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Card } from "../Card"

export class Cards extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}

	async fetch(card: string): Promise<Card | gracely.Error> {
		// I mean it's supposed to return Card.Storable
		return this.client.get<Card>(`/card/card/${card}`)
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
			`/card/card${search}`,
			options && (({ start, end, ...headers }) => headers)(options)
		)
	}
}
