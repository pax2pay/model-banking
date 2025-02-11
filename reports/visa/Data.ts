import { isoly } from "isoly"
import { Transaction } from "../../Transaction"
import { Region } from "./Region"
import { rows } from "./rows"

type PerMonth = Record<1 | 2 | 3, { count: number; volume: number }>
type Monthly = Record<
	| "National Payments"
	| "International - Intra-Regional Payments"
	| "International - Non-EEA Payments"
	| "International - Inter-Regional Payments",
	PerMonth
>
type NonMonthly = Record<
	| "Total Number of Cards"
	| "Total Number of Active Cards"
	| "Total Number of Accounts"
	| "Number of Accounts - International Enabled"
	| "Payments Transactions Declined for Insufficient Funds - Number",
	number
>
type PerIin = Data.Report1 & Data.Report2
export type Data = Partial<Record<Data.Iin, PerIin>>
export namespace Data {
	export type Report1 = Partial<Monthly & NonMonthly>
	// Country X - Region X Payments Card Present Count
	// Country X - Region X Payments Card Not Present Count
	export type Report2 = Record<string, PerMonth> //
	export type Iin = typeof Data.Iin.values[number]
	export namespace Iin {
		export const idx = ["45672555", "4567255", "45672557"] as const
		export function isIdx(value: string): boolean {
			return idx.includes(value as any)
		}
		export const values = [...idx, "44260108", "49359119", "45672554"] as const
	}
	export function getMonth(transaction: Transaction.CardTransaction): 1 | 2 | 3 {
		return 1 // TODO: figure out month number
	}
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
	export function updatePerMonth(previous: PerMonth | undefined, transaction: Transaction.CardTransaction): PerMonth {
		const result: PerMonth = previous ?? {
			"1": { count: 0, volume: 0 },
			"2": { count: 0, volume: 0 },
			"3": { count: 0, volume: 0 },
		}
		if (transaction.direction == "outbound") {
			const month = getMonth(transaction)
			result[month].count++
			result[month].volume = isoly.Currency.add("GBP", result[month].volume, Math.abs(transaction.amount.original))
		}
		return result
	}
	export function updateDataRow(data: PerIin, transaction: Transaction.CardTransaction): PerIin {
		const result: PerIin = data
		if (Array.isArray(transaction.status) && transaction.status[1] == "insufficient funds")
			data["Payments Transactions Declined for Insufficient Funds - Number"] =
				(data?.["Payments Transactions Declined for Insufficient Funds - Number"] ?? 0) + 1
		else if (transaction.status == "finalized") {
			const key: keyof Monthly = getKey(transaction)
			data[key] = updatePerMonth(data[key], transaction)
			// TODO: add non monthly data
			// TODO: add wacky country data
		}
		return result
	}

	export function create(transactions: Transaction.CardTransaction[]): Data {
		const result: Data = {}
		for (const transaction of transactions)
			result[transaction.account.iin as Iin] = updateDataRow(result[transaction.account.iin as Iin] ?? {}, transaction)
		return result
	}
	export function dataToCsv(data: Data, row: typeof rows.nonZero[number]): string {
		let result: string
		if (row.endsWith("Month x")) {
			let key: keyof Monthly
			if (row.startsWith("National"))
				key = "National Payments"
			else if (row.startsWith("International - Inter-Regional"))
				key = "International - Inter-Regional Payments"
			else if (row.startsWith("International - Intra-Regional"))
				key = "International - Intra-Regional Payments"
			else
				key = "International - Non-EEA Payments"
			const months = [1, 2, 3] as const
			const which: "count" | "volume" = row.includes("Count") ? "count" : "volume"
			result = ""
			for (const month of months) {
				result += `${row.replace("Month x", `Month ${month}`)},`
				result += `${data["45672555"]?.[key]?.[month][which] ?? 0},`
				result += `${data["4567255"]?.[key]?.[month][which] ?? 0},`
				result += `${data["45672557"]?.[key]?.[month][which] ?? 0},`
				result += "999," // TODO: total idx
				result += `${data["44260108"]?.[key]?.[month][which] ?? 0},`
				result += `${data["49359119"]?.[key]?.[month][which] ?? 0},`
				result += `${data["45672554"]?.[key]?.[month][which] ?? 0}`
				result += "\n"
			}
		} else {
			result = row + ","
			result += `${data["45672555"]?.[row] ?? 0},`
			result += `${data["4567255"]?.[row] ?? 0},`
			result += `${data["45672557"]?.[row] ?? 0},`
			result += "999," // TODO: total idx
			result += `${data["44260108"]?.[row] ?? 0},`
			result += `${data["49359119"]?.[row] ?? 0},`
			result += `${data["45672554"]?.[row] ?? 0}`
			result += "\n"
		}
		return result
	}
}
