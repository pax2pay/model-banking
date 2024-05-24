import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Treasury as TreasuryModel } from "../Treasury"
import { Result } from "../Treasury/Balance"

export class Treasury {
	constructor(private readonly client: http.Client) {}
	async change(currency: isoly.Currency, changes: Result[]): Promise<gracely.Result> {
		return this.client.patch(`/treasury/${currency}`, changes)
	}
	async fetch(hour?: isoly.DateTime): Promise<TreasuryModel.Snapshot | gracely.Error> {
		const path = hour ? `/${isoly.DateTime.truncate(hour, "hours")}` : ""
		return this.client.get<TreasuryModel.Snapshot>(`/treasury/snapshot${path}`)
	}
	async listTransactions(accountId: string): Promise<TreasuryModel.Transaction[] | gracely.Error> {
		return this.client.get<TreasuryModel.Transaction[]>(`/treasury/account/${accountId}/transaction`)
	}
	async listAccounts(): Promise<
		(TreasuryModel.Account & { transactions: TreasuryModel.Transaction[] })[] | gracely.Error
	> {
		return this.client.get<(TreasuryModel.Account & { transactions: TreasuryModel.Transaction[] })[]>(
			`/treasury/account`
		)
	}
}
