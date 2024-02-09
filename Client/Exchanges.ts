import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Exchange } from "../FX"

export class Exchanges extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async fetch(currency: isoly.Currency): Promise<Exchange.Rates | gracely.Error> {
		return this.client.get<Exchange.Rates>(`/exchange?currencies=${currency}`)
	}
}
