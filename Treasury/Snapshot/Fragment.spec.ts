import { pax2pay } from "../../index"

describe("Fragment.fromLegacy", () => {
	it("fragment.fromLegacy simple", () => {
		const legacy: pax2pay.Treasury.Snapshot.Fragment.Legacy = {
			emoney: { actual: 2 },
			minted: { "safe-01": { amount: 5, account: { id1: 5 } } },
			burned: { "credit-01": { amount: 5, account: { id2: 5 } } },
			fiat: { safe: 1, unsafe: 1, total: 1, other: 1, buffer: 1, accounts: [] },
			warnings: [],
		}
		const neo: pax2pay.Treasury.Snapshot.Fragment = {
			counterbalance: {
				"credit-01": { account: { id2: { amount: -5 } }, total: -5 },
				"safe-01": { account: { id1: { amount: 5 } }, total: 5 },
			},
			emoney: { actual: 2 },
			fiat: { accounts: [], buffer: 1, other: 1, safe: 1, total: 1, unsafe: 1 },
			warnings: [],
		}
		const fragment = pax2pay.Treasury.Snapshot.Fragment.fromLegacy("GBP", legacy)
		expect(fragment).toEqual(neo)
	})
	it("fragment.fromLegacy complex", () => {
		const legacy: pax2pay.Treasury.Snapshot.Fragment.Legacy = {
			emoney: { actual: 2 },
			minted: { "safe-01": { amount: 30, account: { id1: 5, id2: 25 } } },
			burned: {
				"safe-01": { amount: 5, account: { id3: 5 } },
				"credit-01": { amount: 5, account: { id2: 5 } },
			},
			fiat: { safe: 1, unsafe: 1, total: 1, other: 1, buffer: 1, accounts: [] },
			warnings: [],
		}
		const neo: pax2pay.Treasury.Snapshot.Fragment = {
			counterbalance: {
				"safe-01": { account: { id1: { amount: 5 }, id2: { amount: 25 }, id3: { amount: -5 } }, total: 25 },
				"credit-01": { account: { id2: { amount: -5 } }, total: -5 },
			},
			emoney: { actual: 2 },
			fiat: { accounts: [], buffer: 1, other: 1, safe: 1, total: 1, unsafe: 1 },
			warnings: [],
		}
		const fragment = pax2pay.Treasury.Snapshot.Fragment.fromLegacy("GBP", legacy)
		expect(fragment).toEqual(neo)
	})
})
