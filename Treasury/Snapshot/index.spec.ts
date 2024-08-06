import { pax2pay } from "../../index"

describe("Treasury.Snapshot", () => {
	it("fragment.is", () => {
		expect(pax2pay.Treasury.Snapshot.Fragment.type.is(fragment)).toBeTruthy()
	})
	it("is", () => {
		expect(pax2pay.Treasury.Snapshot.type.is(snapshot)).toBeTruthy()
	})
	it("coinage sum", () => {
		pax2pay.Treasury.Snapshot.Fragment.Coinage.sum("USD", {
			one: { account: { asdf: 4 }, amount: 4 },
			two: { account: { qwer: 5, zxcv: 7 }, amount: 13 },
		})
		expect(
			pax2pay.Treasury.Snapshot.Fragment.Coinage.sum("USD", {
				one: { account: { asdf: 4 }, amount: 4 },
				two: { account: { qwer: 5, zxcv: 7 }, amount: 13 },
			})
		).toEqual(17)
	})
})
const fragment: pax2pay.Treasury.Snapshot.Fragment = {
	emoney: { actual: 2 },
	burned: { "paxgiro-safe01": { account: { account1: 1, account2: 2 }, amount: 3 } },
	minted: { "paxgiro-safe01": { account: { account1: 3, account2: 4 }, amount: 7 } },
	fiat: {
		safe: 1,
		unsafe: 1,
		total: 1,
		other: 1,
		buffer: 1,
		accounts: [],
	},
	warnings: [],
}
const snapshot: pax2pay.Treasury.Snapshot = {
	GBP: fragment,
}
