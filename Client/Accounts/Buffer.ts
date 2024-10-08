import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { Transaction } from "../../Transaction"

export class Buffer {
	constructor(private readonly client: http.Client) {}
	async replace(account: string, currency: isoly.Currency, amount: number): Promise<Transaction | gracely.Error> {
		return this.client.put<Transaction>(`/account/${account}/balances/${currency}/buffer`, amount)
	}
}
