import { isoly } from "isoly"
import { pax2pay } from "../../index"

// cSpell:disable
describe("State", () => {
	it("State.Authorization.is", () => {
		const authorization: pax2pay.Rule.State.Authorization = {
			card: "cardid",
			currency: "USD",
			amount: 100,
			account: "accountid",
			merchant: {
				name: "Merchant",
				id: "abcd1234",
				category: "4511",
				address: "Streetname 1, 12345 Towncity",
				city: "CityTown",
				zip: "12345",
				country: "KP",
				reference: "2345erty-abcd1234",
			},
			acquirer: {
				id: "2345erty",
				number: "1351858913568",
				country: "GB",
			},
			exchange: { rate: 1.1, from: ["USD", 100] },
			time: isoly.DateTime.getTime(isoly.DateTime.now()),
			hour: isoly.DateTime.getHour(isoly.DateTime.now()),
			reference: "ahgt3817",
			description: "An upcheck test authorization, to succeed",
		}
		expect(pax2pay.Rule.State.Authorization.type.is(authorization)).toEqual(true)
	})
})
