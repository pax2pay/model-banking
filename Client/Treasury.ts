import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Supplier } from "../Supplier"
import { Transaction } from "../Transaction"
import { Treasury as TreasuryModel } from "../Treasury"

export class Treasury {
	constructor(private readonly client: http.Client) {}
	async fetch(hour?: isoly.DateTime): Promise<TreasuryModel.Snapshot[] | gracely.Error> {
		return this.client.get<TreasuryModel.Snapshot[]>(
			`/treasury/v2/snapshot${hour ? `/${isoly.DateTime.truncate(hour, "hours")}` : ""}`
		)
	}
	async listTransactions(accountId: string): Promise<TreasuryModel.Transaction[] | gracely.Error> {
		return this.client.get<TreasuryModel.Transaction[]>(`/treasury/account/${accountId}/transaction`)
	}
	async listAccounts(): Promise<TreasuryModel.Account.Listable[] | gracely.Error> {
		return this.client.get<TreasuryModel.Account.Listable[]>(`/treasury/account`)
	}
	async notify(
		hour: isoly.DateTime,
		supplier: Supplier,
		currency: isoly.Currency,
		note: Transaction.Note.Creatable
	): Promise<Transaction.Note[] | gracely.Error> {
		return this.client.post<Transaction.Note[]>(`/treasury/snapshot/${hour}/${supplier}/${currency}/note`, note)
	}
	async report(start: isoly.Date, end: isoly.Date, supplier: string): Promise<string | gracely.Error> {
		return this.client.get<string>(`/treasury/${supplier}/report?start=${start}&end=${end}`)
	}
}
