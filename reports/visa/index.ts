import { Data as visaData } from "./Data"
import { rows as visaRows } from "./rows"

export namespace visa {
	export import Data = visaData
	export import rows = visaRows
	const headers = [
		"Product Local Name",
		"Visa IDX - 45672555",
		"Visa IDX  - 4567255",
		"Visa IDX 1.4% - 45672557",
		"Total Visa IDX products",
		"Visa Business Prepaid - 44260108",
		"Visa Corporate Deferred Debit  - 49359119",
		"Visa Business Immediate Debit - BIN: 45672554",
	] as const
	export function toCsv(data: Data): string {
		let csv = headers.join(",") + "\n"
		for (const row of rows.all)
			if (rows.blank.includes(row as any))
				csv += row + ",".repeat(headers.length - 1) + "\n"
			else if (rows.nonZero.includes(row as any))
				csv += Data.toCsv(data, row as any)
			else if (row.endsWith("Month x"))
				for (let i = 1; 3 >= i; i++)
					csv += row.replace("Month x", `Month ${i}`) + ",0".repeat(headers.length - 1) + "\n"
			else
				csv += row + ",0".repeat(headers.length - 1) + "\n"
		csv += Data.Country.toCsv(data.country)
		return csv
	}
}
