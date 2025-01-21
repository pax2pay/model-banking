import { isoly } from "isoly"
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
		expect(pax2pay.Transaction.Statistics.combine(statistics, testData.toCombine, "SEK")).toEqual(
			testData.combinationExpected
		)
	})
	it("should append a domestic transaction to statistics", () => {
		expect(
			pax2pay.Transaction.Statistics.append(statistics, testData.transactionToCount, ["SE"], ["NO"], "SEK")
		).toEqual({
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
	})
	it("should only append capture or refund transactions to statistics", () => {
		expect(
			pax2pay.Transaction.Statistics.append(statistics, testData.transactionToNotCount, ["SE"], ["NO"], "SEK")
		).toEqual(statistics)
	})
	it("should append a intraRegion transaction to statistics", () => {
		expect(
			pax2pay.Transaction.Statistics.append(statistics, testData.intraRegionTransaction, ["SE"], ["NO"], "SEK")
		).toEqual({
			capture: {
				domestic: { count: 1, amount: 100 },
				intraRegion: { count: 1, amount: 22 },
				extraRegion: { count: 5, amount: 5 },
			},
			refund: {
				domestic: { count: 0, amount: 0 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 0, amount: 0 },
			},
		})
	})
	it("should append a extraRegion transaction to statistics", () => {
		expect(
			pax2pay.Transaction.Statistics.append(statistics, testData.extraRegionTransaction, ["SE"], ["NO"], "SEK")
		).toEqual({
			capture: {
				domestic: { count: 1, amount: 100 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 5, amount: 5 },
			},
			refund: {
				domestic: { count: 0, amount: 0 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 1, amount: 33 },
			},
		})
	})
})
namespace testData {
	export const toCombine: pax2pay.Transaction.Statistics = {
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
	export const combinationExpected: pax2pay.Transaction.Statistics = {
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
	function mockTransaction(
		kind: pax2pay.Rule.Base.Kind,
		amount: number,
		country: isoly.CountryCode.Alpha2
	): pax2pay.Transaction {
		return {
			counterpart: {
				type: "card",
				merchant: { name: "", id: "", category: "", address: "", city: "", zip: "", country },
				acquirer: { id: "", number: "" },
			},
			state: { transaction: { kind, amount } },
		} as unknown as pax2pay.Transaction
	}
	export const transactionToCount = mockTransaction("capture", 99, "SE")
	export const transactionToNotCount = mockTransaction("authorization", 100, "NO")
	export const intraRegionTransaction = mockTransaction("capture", 22, "NO")
	export const extraRegionTransaction = mockTransaction("refund", 33, "CA")
}
