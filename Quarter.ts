import { isoly } from "isoly"
import { isly } from "isly"

export type Quarter = typeof Quarter.values[number]
export namespace Quarter {
	export const values = ["Q1", "Q2", "Q3", "Q4"] as const
	export const type = isly.string<Quarter>(values)
	export function from(date: isoly.Date): Quarter {
		const month = isoly.Date.getMonth(date)
		return month < 3 ? "Q1" : month < 6 ? "Q2" : month < 9 ? "Q3" : "Q4"
	}
	export function now() {
		return from(isoly.Date.now())
	}
	export namespace DateRange {
		export const converter: Record<Quarter, { start: string; end: string }> = {
			Q1: { start: "01-01", end: "03-31" },
			Q2: { start: "04-01", end: "06-30" },
			Q3: { start: "07-01", end: "09-30" },
			Q4: { start: "10-01", end: "12-31" },
		}
		export function from(year: number | string, quarter: Quarter): isoly.DateRange | undefined {
			const start = year + "-" + converter[quarter].start
			const end = year + "-" + converter[quarter].end
			return isoly.Date.is(start) && isoly.Date.is(end) ? { start, end } : undefined
		}
		export function now(): isoly.DateRange | undefined {
			const now = isoly.Date.now()
			return from(isoly.Date.getYear(now), Quarter.from(now))
		}
	}
}
