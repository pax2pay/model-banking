import { isoly } from "isoly"
import { isly } from "isly"
import { Account } from "../../Account"

export interface Buffer {
	account: string
	currency: isoly.Currency
	minimum: number
	balance: number
}
export namespace Buffer {
	export const type = isly.object<Buffer>({
		account: isly.string(),
		currency: isly.string(),
		minimum: isly.number(),
		balance: isly.number(),
	})
	export function create(account: Account): Buffer[] {
		const result: Buffer[] = []
		for (const [currency, amount] of Object.entries(account.balance)) {
			const minimum = account.conditions?.minimum?.[currency as isoly.Currency]
			if (typeof minimum != "undefined" && minimum > amount)
				result.push({ account: account.id, currency: currency as isoly.Currency, minimum, balance: amount })
		}
		return result
	}
}
