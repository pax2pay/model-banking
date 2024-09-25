import { pax2pay } from "../../index"

describe("Treasury.Snapshot", () => {
	it("fragment.is", () => {
		expect(pax2pay.Treasury.Snapshot.Fragment.type.is(fragment)).toBeTruthy()
	})
	it("is", () => {
		expect(pax2pay.Treasury.Snapshot.type.is(snapshot)).toBeTruthy()
	})
	it("sum fragment counterbalance accounts", () => {
		const accounts: pax2pay.Treasury.Snapshot.Fragment.Counterbalance[string]["account"] = {
			id1: { amount: 5 },
			id2: { amount: 5 },
			id3: { amount: -5 },
		}
		expect(pax2pay.Treasury.Snapshot.Fragment.Counterbalance.sum("USD", accounts)).toEqual(5)
	})
	it("sum validate counterbalance", () => {
		const counterbalance: pax2pay.Treasury.Snapshot.Fragment.Counterbalance = {
			"safe-01": {
				total: 5,
				account: { id1: { amount: 5 }, id2: { amount: 5 }, id3: { amount: -5 } },
			},
		}
		expect(pax2pay.Treasury.Snapshot.Fragment.Counterbalance.validate("USD", counterbalance)).toEqual(true)
	})
	it("validate fragment", () => {
		const fragment: pax2pay.Treasury.Snapshot.Fragment = {
			warnings: [],
			fiat: { safe: 23846.03, unsafe: 0, total: 23846.03, other: 0, buffer: 0, accounts: [] },
			emoney: { actual: 23846.03 },
			counterbalance: {
				"safe-01": { total: 5, account: { id1: { amount: 5 } } },
				"credit-01": { total: -5, account: { id2: { amount: -5 } } },
			},
		}
		expect(pax2pay.Treasury.Snapshot.Fragment.validate("GBP", fragment)).toEqual(true)
	})
})
const fragment: pax2pay.Treasury.Snapshot.Fragment = {
	emoney: { actual: 2 },
	counterbalance: {
		"safe-01": { total: 5, account: { id1: { amount: 5 } } },
		"credit-01": { total: -5, account: { id2: { amount: -5 } } },
	},
	fiat: { safe: 1, unsafe: 1, total: 1, other: 1, buffer: 1, accounts: [] },
	warnings: [],
}
const snapshot: pax2pay.Treasury.Snapshot = { GBP: fragment }
