import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Treasury as TreasuryModel } from "../Treasury"

export class Treasury {
	constructor(private readonly client: http.Client) {}
	async fetch(hour?: isoly.DateTime): Promise<TreasuryModel.Snapshot | gracely.Error> {
		const path = hour ? `/${isoly.DateTime.truncate(hour, "hours")}` : ""
		return this.client.get<TreasuryModel.Snapshot>(`/treasury/snapshot${path}`)
	}
	async listTransactions(accountId: string): Promise<TreasuryModel.Transaction[] | gracely.Error> {
		return this.client.get<TreasuryModel.Transaction[]>(`/treasury/account/${accountId}/transaction`)
	}
	async listAccounts(): Promise<TreasuryModel.Account.Listable[] | gracely.Error> {
		return this.client.get<TreasuryModel.Account.Listable[]>(`/treasury/account`)
	}
}
