import { Transaction } from "../../../Transaction"
// import { Region } from "../Region"
import { rows } from "../rows"
import { Iin as DataIin } from "./Iin"
import { Monthly } from "./Monthly"
// import { NonMonthly } from "./NonMonthly"
// import { PerMonth } from "./PerMonth"
import { Reports } from "./Reports"

export type Data = Partial<Record<Data.Iin, Reports>>
export namespace Data {
	export import Iin = DataIin
	export function create(transactions: Transaction.CardTransaction[]): Data {
		const result: Data = {}
		for (const transaction of transactions) {
			result[transaction.account.iin as Iin] = Reports.update(result[transaction.account.iin as Iin] ?? {}, transaction)
			if (Iin.isIdx(transaction.account.iin))
				// TODO: better
				result["totalIdx"] = Reports.update(result["totalIdx"] ?? {}, transaction)
		}
		return result
	}
	export function toCsv(data: Data, row: typeof rows.nonZero[number]): string {
		let result: string
		if (row.endsWith("Month x")) {
			const key = Monthly.getKey(row)
			const months = [1, 2, 3] as const
			const which: "count" | "volume" = row.includes("Count") ? "count" : "volume"
			result = ""
			for (const month of months) {
				result += `${row.replace("Month x", `Month ${month}`)},`
				result += `${data["45672555"]?.[key]?.[month][which] ?? 0},`
				result += `${data["4567255"]?.[key]?.[month][which] ?? 0},`
				result += `${data["45672557"]?.[key]?.[month][which] ?? 0},`
				result += `${data["totalIdx"]?.[key]?.[month][which] ?? 0},`
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
			result += `${data["totalIdx"]?.[row] ?? 0},`
			result += `${data["44260108"]?.[row] ?? 0},`
			result += `${data["49359119"]?.[row] ?? 0},`
			result += `${data["45672554"]?.[row] ?? 0}`
			result += "\n"
		}
		return result
	}
}
