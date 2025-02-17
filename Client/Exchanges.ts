import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Exchange } from "../Exchange"

export class Exchanges {
	constructor(private readonly client: http.Client) {}
	async fetch(currency: isoly.Currency): Promise<Exchange.Rates | gracely.Error> {
		return this.client.get<Exchange.Rates>(`/exchange?currencies=${currency}`)
	}
}
