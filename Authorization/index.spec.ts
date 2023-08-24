import { gracely } from "gracely"
import { pax2pay } from "../index"

describe("authorization", () => {
	it("reason array", () => {
		expect(pax2pay.Authorization.is(authorization1)).toBeTruthy()
	})
	it("reason string", () => {
		expect(pax2pay.Authorization.is(authorization2)).toBeTruthy()
	})
})

const authorization1: pax2pay.Authorization = {
	status: {
		code: "05",
		reason: ["Do not honor.", "Another string", "A third string"],
	},
	id: "ahgt3817",
	card: "yRY9MYOl",
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
	reference: "ahgt3817",
	description: "An upcheck test authorization, to succeed",
}
const authorization2: pax2pay.Authorization = {
	status: {
		code: "05",
		reason: "Do not honor.",
	},
	error: gracely.server.backendFailure(),
	id: "ahgt3817",
	card: "yRY9MYOl",
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
	reference: "ahgt3817",
	description: "An upcheck test authorization, to succeed",
}
