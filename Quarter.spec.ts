import { pax2pay } from "./index"

describe("Quarter", () => {
	it("from", () => {
		expect(pax2pay.Quarter.from("2025-01-01")).toBe("Q1")
		expect(pax2pay.Quarter.from("2025-03-31")).toBe("Q1")
		expect(pax2pay.Quarter.from("2025-04-01")).toBe("Q2")
		expect(pax2pay.Quarter.from("2025-01-01")).toBe("Q1")
	})
	it("previous", () => {
		expect(pax2pay.Quarter.previous("Q1")).toEqual("Q4")
		expect(pax2pay.Quarter.previous("Q2")).toEqual("Q1")
		expect(pax2pay.Quarter.previous("Q3")).toEqual("Q2")
		expect(pax2pay.Quarter.previous("Q4")).toEqual("Q3")
	})
	it("DateRange.now", () => {
		expect(pax2pay.Quarter.DateRange.from("2025", "Q1")).toEqual({ start: "2025-01-01", end: "2025-03-31" })
		expect(pax2pay.Quarter.DateRange.from(2025, "Q1")).toEqual({ start: "2025-01-01", end: "2025-03-31" })
		expect(pax2pay.Quarter.DateRange.from(202, "Q1")).toBeUndefined()
	})
})
