import { pax2pay } from "../index"

// cSpell:disable
describe("Settlement", () => {
	it("compile", () => {
		const result = pax2pay.Settlement.compile(settlement, entries)
		expect(result.totals.GBP?.outcome?.net).toEqual(settlement.totals.GBP?.expected.net)
		expect(result.entries.count).toBe(2)
		expect(result.entries.failed?.count).toBe(1)
	})
	it("from legacy", () => {
		const transformed = pax2pay.Settlement.fromLegacy(oldSettlement)
		expect(pax2pay.Settlement.type.is(transformed)).toBeTruthy()
		expect(transformed.totals.GBP?.outcome?.net).toEqual(oldSettlement.outcome.amount.GBP)
		expect(transformed.totals.GBP?.outcome?.fee.other).toEqual(oldSettlement.outcome.fee.other.GBP)
		expect("expected" in transformed.totals.GBP!).toBeTruthy()
		// Should not add properties not in legacy settlement object
		expect("collected" in transformed.totals.GBP!).toBeFalsy()
		expect("settled" in transformed.totals.GBP!).toBeFalsy()
	})
	it("from legacy 2", () => {
		const transformed = pax2pay.Settlement.fromLegacy({
			id: "zzzyRknSygIiGVju",
			status: { collected: "done", settled: "done" },
			by: "automatic",
			outcome: {
				amount: {
					GBP: 1.22,
				},
				fee: {
					other: {
						GBP: 0.02,
					},
				},
			},
			batch: "202401004",
			processor: "uk-mc-tpl-marqeta",
			created: "2024-01-10T11:29:02.267Z",
			entries: {
				count: 1,
			},
			expected: {
				amount: {},
				fee: {
					other: {},
				},
			},
			collected: {
				amount: {
					GBP: 1.22,
				},
				fee: {
					other: {
						GBP: 0.02,
					},
				},
			},
			settled: {
				paid: { GBP: 1.22 },
				transactions: [],
			},
		})
		expect(pax2pay.Settlement.type.is(transformed)).toBeTruthy()
		expect(transformed).toEqual({
			batch: "202401004",
			by: "automatic",
			created: "2024-01-10T11:29:02.267Z",
			entries: { count: 1 },
			id: "zzzyRknSygIiGVju",
			processor: "uk-mc-tpl-marqeta",
			status: { collected: "done", settled: "done" },
			totals: {
				GBP: {
					collected: { fee: { other: 0.02 }, net: 1.22, transactions: { fee: "", net: "", charge: "" } },
					expected: { fee: { other: 0 }, net: 0 },
					outcome: { fee: { other: 0.02 }, net: 1.22 },
					settled: { net: 1.22, transactions: [] },
				},
			},
		})
	})
	it("from legacy 3", () => {
		const transformed = pax2pay.Settlement.fromLegacy({
			id: "zzzyRT4oypE6qZlS",
			status: {
				collected: "done",
				settled: "done",
			},
			by: "automatic",
			outcome: {
				amount: {
					GBP: 596.82,
				},
				fee: {
					other: {
						GBP: 12.18,
					},
				},
			},
			batch: "202406806",
			processor: "uk-mc-tpl-marqeta",
			created: "2024-03-08T14:50:10.988Z",
			entries: {
				count: 1,
			},
			expected: {
				amount: {
					GBP: 596.82,
				},
				fee: {
					other: {
						GBP: 12.18,
					},
				},
			},
			references: [
				"T140-00000033400-2024-03-08-T1408871006805.ASCII.T140.20240308124132.txt.pgp",
				"T140-00000033400-2024-03-08-T1408871006806.ASCII.T140.20240308151957.txt.pgp",
			],
			collected: {
				amount: {
					GBP: 596.82,
				},
				fee: {
					other: {
						GBP: 12.18,
					},
				},
			},
			settled: {
				paid: {
					GBP: 596.82,
				},
				transactions: ["zzzyRT31VQM8hZaC"],
			},
		})
		expect(pax2pay.Settlement.type.is(transformed)).toBeTruthy()
		expect(transformed).toEqual({
			batch: "202406806",
			by: "automatic",
			created: "2024-03-08T14:50:10.988Z",
			entries: { count: 1 },
			id: "zzzyRT4oypE6qZlS",
			processor: "uk-mc-tpl-marqeta",
			references: [
				"T140-00000033400-2024-03-08-T1408871006805.ASCII.T140.20240308124132.txt.pgp",
				"T140-00000033400-2024-03-08-T1408871006806.ASCII.T140.20240308151957.txt.pgp",
			],
			status: { collected: "done", settled: "done" },
			totals: {
				GBP: {
					collected: { fee: { other: 12.18 }, net: 596.82, transactions: { fee: "", net: "", charge: "" } },
					expected: { fee: { other: 12.18 }, net: 596.82 },
					outcome: { fee: { other: 12.18 }, net: 596.82 },
					settled: { net: 596.82, transactions: ["zzzyRT31VQM8hZaC"] },
				},
			},
		})
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
const oldSettlement: pax2pay.Settlement.OldSettlement = {
	id: "abcd1234",
	created: "2000-01-01T00:00:00.001",
	references: ["string"],
	batch: "202327301",
	processor: "test-paxgiro",
	status: { collected: "pending", settled: "pending" },
	expected: {
		amount: { GBP: 1350 },
		fee: { other: { GBP: 13.5 } },
	},
	outcome: {
		amount: { GBP: 900 },
		fee: { other: { GBP: 9 } },
	},
	entries: { count: entries.length },
}
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
