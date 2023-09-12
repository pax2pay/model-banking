import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import { Treasury as TreasuryModel } from "../Treasury"
import { Result } from "../Treasury/Balance"

export class Treasury extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}

	async change(currency: isoly.Currency, changes: Result[]): Promise<gracely.Result> {
		return this.client.patch(`/treasury/${currency}/fiat`, changes)
	}
	async fetch(hour?: isoly.DateTime): Promise<TreasuryModel | gracely.Error> {
		const path = hour ? `/${isoly.DateTime.truncate(hour, "hours")}` : ""
		return this.client.get<TreasuryModel>(`/treasury${path}`)
	}
	async listTransactions(accountId: string): Promise<TreasuryModel.Transaction[] | gracely.Error> {
		return this.client.get<TreasuryModel.Transaction[]>(`/treasury/account/${accountId}/transaction`)
	}
}
