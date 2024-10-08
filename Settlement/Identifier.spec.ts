import { pax2pay } from "../index"

describe("Settlement.Identifier", () => {
	it("create adn getDate", () => {
		const date = "2020-03-15"
		const identifier = pax2pay.Settlement.Identifier.create(date, "test-paxgiro", 2)
		expect(identifier).toEqual("20200315z2")
		const parsed = pax2pay.Settlement.Identifier.getDate(identifier)
		expect(parsed).toEqual(date)
	})
})
