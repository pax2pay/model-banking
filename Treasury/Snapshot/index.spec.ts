import { pax2pay } from "../../index"

describe("Treasury.Snapshot", () => {
	it("is", () => {
		expect(pax2pay.Treasury.Snapshot.type.is(snapshot)).toBeTruthy()
	})
	it("is", () => {
		expect(pax2pay.Treasury.Snapshot.type.is(snapshot)).toBeTruthy()
	})

	it("validate snapshot", () => {
		const snapshot: pax2pay.Treasury.Snapshot = {
			warnings: [],
			supplier: "paxgiro",
			currency: "GBP",
			fiat: { safe: 23846.03, unsafe: 0, total: 23846.03, other: 0, buffer: 0, accounts: [] },
			emoney: { actual: 23846.03 },
		}
		expect(pax2pay.Treasury.Snapshot.validate(snapshot)).toEqual(true)
	})
})
const snapshot: pax2pay.Treasury.Snapshot = {
	supplier: "paxgiro",
	currency: "GBP",
	emoney: { actual: 2 },
	fiat: { safe: 1, unsafe: 1, total: 1, other: 1, buffer: 1, accounts: [] },
	warnings: [],
}
