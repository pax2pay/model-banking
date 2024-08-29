import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"

export class Buffer {
	constructor(private readonly client: http.Client) {}
	async replace(account: string, currency: isoly.Currency, amount: number): Promise<number | gracely.Error> {
		return this.client.put<number>(`/account/${account}/balances/${currency}/buffer`, amount)
	}
}
