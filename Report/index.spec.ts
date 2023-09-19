import { isoly } from "isoly"
import { Report } from "./index"

describe("Report", () => {
	let rows: string[]
	it("Row to string", () => {
		rows = rawRows.map(r => Report.Row.toCsv(r, delimiter))
		expect(rows).toEqual([`"1"|"one"`, `"2"|"two"`, `"3"|"four"`, `"4"|"six"`, `""|""`])
	})
	it("toCsv", () => {
		expect(Report.toCsv(header, rows, "|", prefix)).toEqual(
			`"time"|"space"|"name"\n` +
				`"${prefix}"|"1"|"one"\n` +
				`"${prefix}"|"2"|"two"\n` +
				`"${prefix}"|"3"|"four"\n` +
				`"${prefix}"|"4"|"six"\n` +
				`"${prefix}"|""|""`
		)
	})
})

const prefix = isoly.Date.now()
const header = ["time", "space", "name"]
const delimiter = "|"
const rawRows = [
	[1, "one"],
	[2, "two"],
	[3, "four"],
	[4, "six"],
	[undefined, null],
]
