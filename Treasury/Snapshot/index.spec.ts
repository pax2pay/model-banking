import { pax2pay } from "../../index"

describe("Treasury.Snapshot", () => {
	it("is", () => {
		expect(pax2pay.Treasury.Snapshot.type.is(snapshot)).toBeTruthy()
	})
	it("is", () => {
		expect(pax2pay.Treasury.Snapshot.type.is(snapshot)).toBeTruthy()
	})
})
const snapshot: pax2pay.Treasury.Snapshot = {
	supplier: "paxgiro",
	currency: "GBP",
	emoney: { available: 2 },
	counterbalance: {
		"safe-01": { total: 5, account: { id1: { amount: 5 } } },
		"credit-01": { total: -5, account: { id2: { amount: -5 } } },
	},
	fiat: { safe: 1, unsafe: 1, total: 1, other: 1, buffer: 1, accounts: [] },
	warnings: [],
}
