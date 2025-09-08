import { pax2pay } from "../index"

// cSpell:disable
describe("Settlement", () => {
	it("compile", () => {
		const result = pax2pay.Settlement.compile(settlement, entries)
		expect(result.totals.GBP?.outcome?.net).toEqual(settlement.totals.GBP?.expected.net)
		expect(result.entries.count).toBe(2)
		expect(result.entries.failed?.count).toBe(1)
	})
})
const entries: pax2pay.Settlement.Entry[] = [
	{
		type: "capture",
		created: "2025-09-08T12:38:55.290Z",
		card: {
			type: "card",
			scheme: "mastercard",
			id: "string",
			iin: "12341234",
			last4: "1234",
			expiry: [34, 12],
			holder: "unknown",
		},
		status: "succeeded",
		transaction: { id: "unknown", posted: "", description: "" },
		account: "unknown",
		approvalCode: "unknown",
		merchant: {
			name: "Merchant",
			id: "abcd1234",
			category: "4511",
			address: "Streetname 1, 12345 Towncity",
			city: "CityTown",
			zip: "12345",
			country: "KP",
		},
		acquirer: { id: "2345erty", number: "1351858913568", country: "GB" },
		reference: "string",
		batch: "20241202",
		fee: { other: { GBP: 2 } },
		amount: ["GBP", 200],
		settlement: "20241202a1",
	},
	{
		type: "capture",
		created: "2025-09-08T12:38:55.291Z",
		card: {
			type: "card",
			scheme: "mastercard",
			id: "string",
			iin: "12341234",
			last4: "1234",
			expiry: [34, 12],
			holder: "unknown",
		},
		status: "succeeded",
		transaction: { id: "unknown", posted: "", description: "" },
		account: "unknown",
		approvalCode: "unknown",
		merchant: {
			name: "Merchant",
			id: "abcd1234",
			category: "4511",
			address: "Streetname 1, 12345 Towncity",
			city: "CityTown",
			zip: "12345",
			country: "KP",
		},
		acquirer: { id: "2345erty", number: "1351858913568", country: "GB" },
		reference: "string",
		batch: "20241202",
		fee: { other: { GBP: 2.5 } },
		amount: ["GBP", 250],
		settlement: "20241202a1",
	},
	{
		status: "failed",
		reason: "Error",
		created: "2023-12-05T17:26:36.977Z",
		type: "unknown",
		data: { type: "Error", message: "Error" },
		batch: "20241202",
	},
]
const settlement: pax2pay.Settlement = {
	id: "abcd1234",
	created: "2000-01-01T00:00:00.001",
	references: ["string"],
	batch: "202327301",
	processor: "test-paxgiro",
	status: { collected: "pending", settled: "pending" },
	totals: {
		GBP: {
			expected: {
				net: 450,
				fee: { other: 4.5 },
			},
		},
	},
	entries: { count: 0 },
}
