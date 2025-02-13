import { isoly } from "isoly"
import { Transaction } from "../../../Transaction"
import { Region } from "../Region"
// import { Region } from "../Region"
import { rows } from "../rows"
import { Iin as DataIin } from "./Iin"
import { Monthly } from "./Monthly"
import { NonMonthly } from "./NonMonthly"
import { PerMonth } from "./PerMonth"
// import { NonMonthly } from "./NonMonthly"
// import { PerMonth } from "./PerMonth"
// import { Reports } from "./Reports"

export type Data = {
	monthly: Monthly
	nonMonthly: NonMonthly
	country: Partial<Record<isoly.CountryCode.Alpha2, PerMonth>>
}
export namespace Data {
	export import Iin = DataIin
	export function create(transactions: Transaction.CardTransaction[]): Data {
		const result: Data = { monthly: {}, nonMonthly: NonMonthly.empty, country: {} }
		for (const transaction of transactions)
			if (Array.isArray(transaction.status) && transaction.status[1] == "insufficient funds")
				result.nonMonthly["Payments Transactions Declined for Insufficient Funds - Number"][
					transaction.account.iin as Iin
				] =
					(result.nonMonthly["Payments Transactions Declined for Insufficient Funds - Number"]?.[
						transaction.account.iin as Iin
					] ?? 0) + 1
			else if (transaction.status == "finalized") {
				const key = Region.find(transaction)
				result.monthly[key] = Monthly.update(result.monthly[key], transaction)
				// TODO: country / regional data
				// const a = result.monthly[key]
				// result.country[transaction.counterpart.merchant.country] = result.monthly[key]
			}

		return result
	}
	export function toCsv(data: Data, row: typeof rows.nonZero[number]): string {
		let result: string
		if (row.endsWith("Month x"))
			result = Monthly.toCsvRow(data.monthly, row)
		else
			result = NonMonthly.toCsvRow(data.nonMonthly, row)
		return result
	}
}
