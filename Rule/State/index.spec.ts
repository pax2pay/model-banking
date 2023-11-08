import { isoly } from "isoly"
import "jest"
import { pax2pay } from "../../index"

describe("State", () => {
	it("State.Authorization.is", () => {
		const authorization: pax2pay.Rule.State.Authorization = {
			card: "cardid",
			currency: "USD",
			amount: 100,
			merchant: {
				name: "Merchant",
				id: "abcd1234",
				category: "4511",
				address: "Streetname 1, 12345 Towncity",
				city: "CityTown",
				zip: "12345",
				country: "KP",
			},
			acquirer: {
				id: "2345erty",
				number: "1351858913568",
				country: "GB",
			},
			original: { currency: "USD", amount: 100 },
			time: isoly.DateTime.getTime(isoly.DateTime.now()),
			reference: "ahgt3817",
			description: "An upcheck test authorization, to succeed",
		}
		expect(pax2pay.Rule.State.Authorization.is(authorization)).toEqual(true)
	})
})
