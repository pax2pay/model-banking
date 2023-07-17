import { pax2pay } from "../index"

const years = [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

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
