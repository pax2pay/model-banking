import { pax2pay } from "../../index"

describe("Treasury.Snapshot", () => {
	it("is", () => {
		expect(pax2pay.Treasury.Snapshot.type.is(snapshot)).toBeTruthy()
	})
	it("is", () => {
		expect(pax2pay.Treasury.Snapshot.type.is(snapshot)).toBeTruthy()
	})
	it("sum snapshot counterbalance accounts", () => {
		const accounts: pax2pay.Treasury.Snapshot.Counterbalance[string]["account"] = {
			id1: { amount: 5 },
			id2: { amount: 5 },
			id3: { amount: -5 },
		}
		expect(pax2pay.Treasury.Snapshot.Counterbalance.sum("USD", accounts)).toEqual(5)
	})
	it("sum validate counterbalance", () => {
		const counterbalance: pax2pay.Treasury.Snapshot.Counterbalance = {
			"safe-01": {
				total: 5,
				account: { id1: { amount: 5 }, id2: { amount: 5 }, id3: { amount: -5 } },
			},
		}
		expect(pax2pay.Treasury.Snapshot.Counterbalance.validate("USD", counterbalance)).toEqual(true)
	})
	it("validate snapshot", () => {
		const snapshot: pax2pay.Treasury.Snapshot = {
			warnings: [],
			supplier: "paxgiro",
			currency: "GBP",
			fiat: { safe: 23846.03, unsafe: 0, total: 23846.03, other: 0, buffer: 0, accounts: [] },
			emoney: { actual: 23846.03 },
			counterbalance: {
				"safe-01": { total: 5, account: { id1: { amount: 5 } } },
				"credit-01": { total: -5, account: { id2: { amount: -5 } } },
			},
		}
		expect(pax2pay.Treasury.Snapshot.validate(snapshot)).toEqual(true)
	})
})
const snapshot: pax2pay.Treasury.Snapshot = {
	supplier: "paxgiro",
	currency: "GBP",
	emoney: { actual: 2 },
	counterbalance: {
		"safe-01": { total: 5, account: { id1: { amount: 5 } } },
		"credit-01": { total: -5, account: { id2: { amount: -5 } } },
	},
	fiat: { safe: 1, unsafe: 1, total: 1, other: 1, buffer: 1, accounts: [] },
	warnings: [],
}
