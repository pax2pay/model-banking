import { authly } from "authly"
import "jest"
import { pax2pay } from "../index"

describe("transaction", () => {
	it("test", async () => {
		expect(pax2pay.Transaction.is(transaction)).toBeTruthy()
	})
})

const transaction: pax2pay.Transaction = {
	organization: "agpiPo0v",
	accountId: "WzauRHBO",
	account: {
		type: "internal",
		identifier: "WzauRHBO",
	},
	id: "_ydGlMD_",
	posted: "2023-08-31T12:18:44.440Z",
	balance: 312,
	amount: -1,
	currency: "USD",
	description: "An upcheck test authorization, to fail",
	counterpart: {
		type: "card",
		scheme: "mastercard",
		iin: "111111",
		expiry: [26, 12],
		last4: "1117",
		holder: "Upcheck",
		id: "zzzzztgEUtQo5-QR",
		merchant: {
			name: "Merchant",
			id: "abcd1234",
			category: "4511",
			country: "KP",
			city: "upcheck town",
			zip: "12345",
			address: "Streetname 1, 12345 Towncity",
		},
		acquirer: {
			id: "2345erty",
			number: "1351858913568",
			country: "GB",
		},
	},
	operations: [
		{
			account: "WzauRHBO",
			currency: "USD",
			change: {
				outgoingReserved: {
					type: "add",
					amount: 1,
					status: "pending",
				},
			},
			id: "_ydGlMD_",
			counter: 0,
			created: "2023-08-31T12:18:44.440Z",
		},
	],
	status: "rejected",
	flags: [],
	notes: [
		{
			author: "automatic",
			created: "2023-08-31T12:18:44.483Z",
			text: "{ label: Country ban, action: reject, type: authorization, condition: authorization.merchant.country:KP, description: No transactions allowed to North Korea. }",
		},
	],
}
