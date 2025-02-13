import { Transaction } from "../../../Transaction"
import { rows } from "../rows"
import { Iin } from "./Iin"

export type NonMonthly = Record<
	| "Total Number of Cards"
	| "Total Number of Active Cards"
	| "Total Number of Accounts"
	| "Number of Accounts - International Enabled"
	| "Payments Transactions Declined for Insufficient Funds - Number",
	Partial<Record<Iin, number>>
>
export namespace NonMonthly {
	export const empty: NonMonthly = {
		"Number of Accounts - International Enabled": {},
		"Payments Transactions Declined for Insufficient Funds - Number": {},
		"Total Number of Accounts": {},
		"Total Number of Active Cards": {},
		"Total Number of Cards": {},
	}
	export function update(previous: NonMonthly, transaction: Transaction.CardTransaction): NonMonthly {
		const result = previous
		if (Array.isArray(transaction.status) && transaction.status[1] == "insufficient funds")
			result["Payments Transactions Declined for Insufficient Funds - Number"][transaction.account.iin as Iin] =
				(result["Payments Transactions Declined for Insufficient Funds - Number"]?.[transaction.account.iin as Iin] ??
					0) + 1
		return result
	}
	export function toCsvRow(data: NonMonthly, row: rows.NonZero): string {
		let result = row
		for (const iin of Iin.values)
			result += `|${data[row as keyof NonMonthly][iin] ?? 0}`
		result += "\n"
		return result
	}
}
