import { Transaction } from "../../../Transaction"
import { Region } from "../Region"
import { Monthly } from "./Monthly"
import { NonMonthly } from "./NonMonthly"
import { PerMonth } from "./PerMonth"

export type Reports = Reports.One & Reports.Two
export namespace Reports {
	export type One = Partial<Monthly & NonMonthly>
	// Country X - Region X Payments Card Present Count
	// Country X - Region X Payments Card Not Present Count
	export type Two = Record<string, PerMonth> //
	export function getKey(transaction: Transaction.CardTransaction): keyof Monthly {
		let result: keyof Monthly
		const region = Region.find(transaction)
		switch (region) {
			case "National":
				result = "National Payments"
				break
			case "Inter-Regional":
				result = "International - Inter-Regional Payments"
				break
			case "Intra-Regional":
				result = "International - Intra-Regional Payments"
				break
			case "Non-EEA":
				result = "International - Non-EEA Payments"
				break
		}
		return result
	}
	export function update(reports: Reports, transaction: Transaction.CardTransaction): Reports {
		const result: Reports = reports
		if (Array.isArray(transaction.status) && transaction.status[1] == "insufficient funds")
			reports["Payments Transactions Declined for Insufficient Funds - Number"] =
				(reports?.["Payments Transactions Declined for Insufficient Funds - Number"] ?? 0) + 1
		else if (transaction.status == "finalized") {
			const key: keyof Monthly = getKey(transaction)
			reports[key] = Monthly.update(reports[key], transaction)
			// TODO: add non monthly data
			// TODO: add wacky country data
		}
		return result
	}
}
