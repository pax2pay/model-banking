import { isoly } from "isoly"
import { Transaction } from "../../../Transaction"
import { Region } from "../Region"
// import { Region } from "../Region"
import { rows } from "../rows"
import { Iin as DataIin } from "./Iin"
import { NonMonthly } from "./NonMonthly"
import { PerMonth } from "./PerMonth"
import { Regional } from "./Regional"
// import { NonMonthly } from "./NonMonthly"
// import { PerMonth } from "./PerMonth"
// import { Reports } from "./Reports"

export type Data = {
	regional: Regional
	nonMonthly: NonMonthly
	country: Partial<Record<isoly.CountryCode.Alpha2, PerMonth>>
}
export namespace Data {
	export import Iin = DataIin
	export function create(transactions: Transaction.CardTransaction[]): Data {
		const result: Data = { regional: {}, nonMonthly: NonMonthly.empty, country: {} }
		for (const transaction of transactions)
			if (Array.isArray(transaction.status) && transaction.status[1] == "insufficient funds")
				result.nonMonthly["Payments Transactions Declined for Insufficient Funds - Number"][
					transaction.account.iin as Iin
				] =
					(result.nonMonthly["Payments Transactions Declined for Insufficient Funds - Number"]?.[
						transaction.account.iin as Iin
					] ?? 0) + 1
			else if (transaction.status == "finalized") {
				const region = Region.find(transaction)
				result.regional[region] = Regional.update(result.regional[region], transaction)
				// TODO: country / regional data
				// const a = result.monthly[key]
				// result.country[transaction.counterpart.merchant.country] = result.monthly[key]
			}

		return result
	}
	export function toCsv(data: Data, row: typeof rows.nonZero[number]): string {
		let result: string
		if (row.endsWith("Month x"))
			result = Regional.toCsvRow(data.regional, row)
		else
			result = NonMonthly.toCsvRow(data.nonMonthly, row)
		return result
	}
}
