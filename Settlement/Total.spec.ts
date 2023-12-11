import { pax2pay } from "../index"

describe("Settlement.Total", () => {
	const total: pax2pay.Settlement.Total = { amount: { GBP: 25, USD: 12 }, fee: { other: { GBP: 2.5, USD: 1.2 } } }
	const expected1: pax2pay.Settlement.Total = { amount: { GBP: 25, USD: 12 }, fee: { other: { GBP: 2.5, USD: 1.2 } } }
	const expected2: pax2pay.Settlement.Total = { amount: { GBP: 27, USD: 12 }, fee: { other: { GBP: 2.7, USD: 1.2 } } }
	const expected3: pax2pay.Settlement.Total = {
		amount: { GBP: 25, USD: 12, PLN: 1650 },
		fee: { other: { GBP: 2.5, USD: 1.2, PLN: 165 } },
	}
	const expected4: pax2pay.Settlement.Total = { amount: { GBP: 25 }, fee: { other: { GBP: 2.5 } } }
	it("Compare", () => {
		expect(pax2pay.Settlement.Total.compare(expected1, total)).toBeTruthy()
		expect(pax2pay.Settlement.Total.compare(expected2, total)).toBeFalsy()
		expect(pax2pay.Settlement.Total.compare(expected3, total)).toBeFalsy()
		expect(pax2pay.Settlement.Total.compare(expected4, total)).toBeFalsy()
	})
	const collected: pax2pay.Transaction.Collect = {
		counterbalances: {
			GBP: {
				"fee_test-tpl-paxgiro_202334101": 10,
				"settle_test-tpl-paxgiro_202334101": 100,
			},
			SEK: {
				"fee_test-tpl-paxgiro_202334101": 10,
				"settle_test-tpl-paxgiro_202334101": 100,
			},
		},
	}
	it("from", () => {
		expect(pax2pay.Settlement.Total.from(collected)).toEqual({
			amount: { GBP: 100, SEK: 100 },
			fee: { other: { GBP: 10, SEK: 10 } },
		})
	})
	it("from twice", () => {
		expect(pax2pay.Settlement.Total.from(collected, pax2pay.Settlement.Total.from(collected))).toEqual({
			amount: { GBP: 200, SEK: 200 },
			fee: { other: { GBP: 20, SEK: 20 } },
		})
	})
})
