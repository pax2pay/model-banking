import { gracely } from "gracely"
import { pax2pay } from "../index"

describe("Settlement", () => {
	it("compile", () => {
		expect(pax2pay.Settlement.compile(settlement, entries).outcome).toEqual(settlement.expected)
	})
	it("batch regexp", () => {
		expect(pax2pay.Settlement.Batch.is("202300101")).toBeTruthy()
		expect(pax2pay.Settlement.Batch.is("202300107")).toBeFalsy()
		expect(pax2pay.Settlement.Batch.is("202344401")).toBeFalsy()
		expect(pax2pay.Settlement.Batch.is("aaaaaaa")).toBeFalsy()
	})
})

const authorization1: pax2pay.Authorization = {
	status: "approved",
	id: "ahgt3817",
	card: {
		id: "string",
		token: "string",
		iin: "12341234",
		last4: "1234",
	},
	created: "2023-08-07T09:25:11.296Z",
	amount: ["GBP", 200],
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
	description: "golf trip",
}
const authorization2: pax2pay.Authorization = {
	status: {
		code: "05",
		reason: "Do not honor.",
		error: gracely.server.backendFailure(),
	},
	id: "ahgt3817",
	card: {
		id: "string",
		token: "string",
		iin: "12341234",
		last4: "1234",
	},
	created: "2023-08-07T09:25:11.296Z",
	amount: ["GBP", 250],
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
	description: "golf trip",
}
const entries: pax2pay.Settlement.Entry[] = [
	{
		status: "succeeded",
		type: "capture",
		authorization: authorization1,
		reference: "string",
		batch: "202327301",
		fee: { other: { [authorization1.amount[0]]: authorization1.amount[1] * 0.01 } },
		amount: authorization1.amount,
	},
	{
		status: "succeeded",
		type: "capture",
		authorization: authorization2,
		reference: "string",
		batch: "202327301",
		fee: { other: { [authorization2.amount[0]]: authorization2.amount[1] * 0.01 } },
		amount: authorization2.amount,
	},
]

const settlement: pax2pay.Settlement = {
	id: "abcd1234",
	created: "2000-01-01T00:00:00.001",
	reference: "string",
	batch: "202327301",
	processor: "test-paxgiro",
	status: "ongoing",
	expected: {
		amount: { GBP: 900 },
		fee: { other: { GBP: 900 * 0.01 } },
	},
	outcome: {
		amount: { GBP: 900 },
		fee: { other: { GBP: 900 * 0.01 } },
	},
	entries: { count: entries.length },
}
