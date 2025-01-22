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
			cards: ["5", "6", "7"],
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
			cards: ["5", "6", "7", "1"],
		})
	})
	it("should only append capture or refund transactions to statistics", () => {
		const expected = {
			capture: {
				domestic: { ...statistics.capture.domestic },
				intraRegion: { ...statistics.capture.intraRegion },
				extraRegion: { ...statistics.capture.extraRegion },
			},
			refund: {
				domestic: { ...statistics.refund.domestic },
				intraRegion: { ...statistics.refund.intraRegion },
				extraRegion: { ...statistics.refund.extraRegion },
			},
			cards: [...statistics.cards],
		}
		expect(
			pax2pay.Transaction.Statistics.append(statistics, testData.transactionToNotCount, ["SE"], ["NO"], "SEK")
		).toEqual(expected)
	})
	it("should append an intraRegion transaction to statistics", () => {
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
			cards: ["5", "6", "7", "1"],
		})
	})
	it("should append an extraRegion transaction to statistics", () => {
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
			cards: ["5", "6", "7", "1"],
		})
	})
	it("should only append new cards to statistics", () => {
		const transactions = [
			testData.transactionToCountCard1,
			testData.transactionToCountCard2,
			testData.transactionToCountCard3,
			testData.transactionToNotCountCard,
			testData.transactionToNotCountCardAgain,
		]
		const result = transactions.reduce(
			(statistics, transaction) =>
				pax2pay.Transaction.Statistics.append(statistics, transaction, ["SE"], ["NO"], "SEK"),
			statistics
		)
		expect(result.cards).toEqual(["5", "6", "7", "1", "2", "3"])
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
		cards: ["7", "8", "9"],
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
		cards: ["5", "6", "7", "8", "9"],
	}
	function mockTransaction(
		kind: pax2pay.Rule.Base.Kind,
		amount: number,
		country: isoly.CountryCode.Alpha2,
		card: string
	): pax2pay.Transaction {
		return {
			account: {
				type: "card",
				scheme: "mastercard",
				id: card,
				iin: "111111",
				last4: "1234",
				expiry: [39, 12],
				holder: "",
			},
			counterpart: {
				type: "card",
				merchant: { name: "", id: "", category: "", address: "", city: "", zip: "", country },
				acquirer: { id: "", number: "" },
			},
			state: { transaction: { kind, amount } },
		} as unknown as pax2pay.Transaction
	}
	export const transactionToCount = mockTransaction("capture", 99, "SE", "1")
	export const transactionToNotCount = mockTransaction("authorization", 100, "NO", "1")
	export const intraRegionTransaction = mockTransaction("capture", 22, "NO", "1")
	export const extraRegionTransaction = mockTransaction("refund", 33, "CA", "1")
	export const transactionToCountCard1 = mockTransaction("capture", 10, "SE", "1")
	export const transactionToCountCard2 = mockTransaction("capture", 10, "SE", "2")
	export const transactionToCountCard3 = mockTransaction("capture", 10, "SE", "3")
	export const transactionToNotCountCard = mockTransaction("authorization", 10, "SE", "4")
	export const transactionToNotCountCardAgain = mockTransaction("capture", 10, "SE", "2")
}
