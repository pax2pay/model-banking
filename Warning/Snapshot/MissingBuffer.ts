import { isoly } from "isoly"
import { isly } from "isly"
import { Treasury } from "../../Treasury"
import { Base } from "../Base"

export interface MissingBuffer extends Base {
	type: "missing-buffer"
	severity?: "high"
	currency: isoly.Currency
	minimum: number
	balance: number
}
export namespace MissingBuffer {
	export const type = Base.type.extend<MissingBuffer>({
		type: isly.string("missing-buffer"),
		severity: isly.string("high").optional(),
		currency: isly.string(),
		minimum: isly.number(),
		balance: isly.number(),
	})
	export function create(account: Treasury.Account): MissingBuffer[] {
		const result: MissingBuffer[] = []
		for (const [currency, amount] of Object.entries(account.balance)) {
			const minimum = account.conditions?.minimum?.[currency as isoly.Currency]
			if (typeof minimum != "undefined" && minimum > amount)
				result.push({
					type: "missing-buffer",
					resource: account.code,
					currency: currency as isoly.Currency,
					minimum,
					balance: amount,
					date: isoly.Date.now(),
				})
		}
		return result
	}
}
