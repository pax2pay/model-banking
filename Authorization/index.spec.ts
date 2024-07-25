import { pax2pay } from "../index"

// cSpell:disable
describe("authorization", () => {
	it("reason array", () => {
		expect(pax2pay.Authorization.type.is(authorization1)).toBeTruthy()
	})
	it("reason string", () => {
		expect(pax2pay.Authorization.type.is(authorization2)).toBeTruthy()
	})
})

const authorization1: pax2pay.Authorization = {
	status: "other",
	id: "ahgt3817",
	card: {
		id: "string",
		token: "string",
		iin: "12341234",
		last4: "1234",
	},
	created: "2023-08-07T09:25:11.296Z",
	amount: ["GBP", 100],
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
	account: "1234",
	reference: "ahgt3817",
	description: "An upcheck test authorization, to succeed",
}
const authorization2: pax2pay.Authorization = {
	status: "other",
	id: "ahgt3817",
	card: {
		id: "string",
		token: "string",
		iin: "12341234",
		last4: "1234",
	},
	created: "2023-08-07T09:25:11.296Z",
	amount: ["GBP", 100],
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
	account: "1234",
	reference: "ahgt3817",
	description: "An upcheck test authorization, to succeed",
}
