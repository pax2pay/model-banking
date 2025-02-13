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
	export function toCsvRow(data: NonMonthly, row: string): string {
		let result = row
		for (const iin of Iin.values)
			result += `,${data[row as keyof NonMonthly][iin] ?? 0}`
		result += "\n"
		return result
	}
}
