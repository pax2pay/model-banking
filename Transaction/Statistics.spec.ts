import { pax2pay } from "../index"

describe("Transaction Statistics", () => {
	let statistics: pax2pay.Transaction.Statistics
	beforeEach(() => {
		statistics = {
			capture: {
				domestic: { count: 1, amount: 100 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 5, amount: 5 },
			},
			refund: {
				domestic: { count: 0, amount: 0 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 0, amount: 0 },
			},
		}
	})
	it("should type check", () => {
		expect(pax2pay.Transaction.Statistics.type.is(statistics)).toBeTruthy()
	})
	it("should combine two statistics", () => {
		const toCombine: pax2pay.Transaction.Statistics = {
			capture: {
				domestic: { count: 2, amount: 200 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 30, amount: 10500 },
			},
			refund: {
				domestic: { count: 0, amount: 0 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 1, amount: 10 },
			},
			cursor: "cursor",
		}
		const expected: pax2pay.Transaction.Statistics = {
			capture: {
				domestic: { count: 3, amount: 300 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 35, amount: 10505 },
			},
			refund: {
				domestic: { count: 0, amount: 0 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 1, amount: 10 },
			},
		}
		const result = pax2pay.Transaction.Statistics.combine(statistics, toCombine)
		expect(result).toEqual(expected)
	})
	it("should append a transaction to statistics", () => {
		const transactionToCount = {
			state: {
				authorization: { merchant: { country: "SE" } },
				transaction: { kind: "capture", amount: 99 },
			},
		} as unknown as pax2pay.Transaction
		const transactionToNotCount = {
			state: {
				authorization: { merchant: { country: "NO" } },
				transaction: { kind: "authorization", amount: 100 },
			},
		} as unknown as pax2pay.Transaction
		expect(pax2pay.Transaction.Statistics.append(statistics, transactionToCount, ["SE"], ["NO"])).toEqual({
			capture: {
				domestic: { count: 2, amount: 199 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 5, amount: 5 },
			},
			refund: {
				domestic: { count: 0, amount: 0 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 0, amount: 0 },
			},
		})
		expect(pax2pay.Transaction.Statistics.append(statistics, transactionToNotCount, ["SE"], ["NO"])).toEqual(statistics)
	})
})
