import { pax2pay } from "../index"

const years = [
	2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040,
]

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
describe("Card.Expiry", () => {
	describe.each(years)("is()", year => {
		describe.each(months)("truthy", month => {
			test(`with expiry ${JSON.stringify([year, month])}`, () => {
				expect(pax2pay.Card.Expiry.is([year, month])).toBeTruthy()
			})
		})
	})
	it("is() falsy", () => {
		expect(pax2pay.Card.Expiry.is([1000, 1000])).toBeFalsy()
	})
})
