import * as gracely from "gracely"
import * as isoly from "isoly"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Result } from "../Balance"
import { Treasury as TreasuryModel } from "../Treasury"

export class Treasury extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}

	async change(currency: isoly.Currency, changes: Result[]): Promise<gracely.Result> {
		return this.client.patch(`/treasury/${currency}/fiat`, changes)
	}
	async fetch(hour?: isoly.DateTime): Promise<TreasuryModel | gracely.Error> {
		const path = hour ? `?time=${hour}` : ""
		return this.client.get<TreasuryModel>(`/treasury${path}`)
	}
}
