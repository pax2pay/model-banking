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
		// report 1
		let csv = headers.join("|") + "\n"
		for (const row of rows.all)
			if (rows.Blank.type.is(row))
				// Leave empty for operations team to fill
				csv += rows.Blank.toCsvRow(row, headers.length - 1)
			else if (rows.NonZero.type.is(row))
				// "report 1" data
				csv += Data.toCsv(data, row)
			else if (row.endsWith("Month x"))
				// rows with zeroes for each month
				csv += rows.monthlyZeroRows(row, headers.length - 1)
			// rows with zeroes
			else
				csv += rows.zeros(row, headers.length - 1)
		// append "report 2" to the end
		csv += Data.Country.toCsv(data.country)
		return csv
	}
}
