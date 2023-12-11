import { Total } from "./Total"

describe("Settlement.Total", () => {
	const total: Total = { amount: { GBP: 25, USD: 12 }, fee: { other: { GBP: 2.5, USD: 1.2 } } }
	const expected1: Total = { amount: { GBP: 25, USD: 12 }, fee: { other: { GBP: 2.5, USD: 1.2 } } }
	const expected2: Total = { amount: { GBP: 27, USD: 12 }, fee: { other: { GBP: 2.7, USD: 1.2 } } }
	const expected3: Total = { amount: { GBP: 25, USD: 12, PLN: 1650 }, fee: { other: { GBP: 2.5, USD: 1.2, PLN: 165 } } }
	const expected4: Total = { amount: { GBP: 25 }, fee: { other: { GBP: 2.5 } } }
	it("Compare", () => {
		expect(Total.compare(expected1, total)).toBeTruthy()
		expect(Total.compare(expected2, total)).toBeFalsy()
		expect(Total.compare(expected3, total)).toBeFalsy()
		expect(Total.compare(expected4, total)).toBeFalsy()
	})
})
