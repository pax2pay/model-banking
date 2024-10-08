import { pax2pay } from "../index"

describe("Settlement.Totals", () => {
	it("verify", () => {
		expect(pax2pay.Settlement.Totals.verify(totals, "outcome")).toEqual(true)
		expect(pax2pay.Settlement.Totals.verify(totals2, "outcome")).toEqual(false)
		expect(pax2pay.Settlement.Totals.verify(totals3, "outcome")).toEqual(false)
		expect(pax2pay.Settlement.Totals.verify(totals4, "collected")).toEqual(true)
		expect(pax2pay.Settlement.Totals.verify(totals, "collected")).toEqual(false)
		expect(pax2pay.Settlement.Totals.verify(totals5, "collected")).toEqual(false)
	})
	it("add", () => {
		expect(pax2pay.Settlement.Totals.add(totals, totals2)).toEqual({
			USD: {
				expected: { charge: 3, fee: { other: 20 }, net: 10 },
				outcome: { charge: 3, fee: { other: 20 }, net: 7782 },
			},
		})
	})
	it("add several currencies", () => {
		expect(pax2pay.Settlement.Totals.add(totals2, totals3)).toEqual({
			BOV: {
				expected: { fee: { other: 10 }, net: 5, charge: 0 },
				outcome: { fee: { other: 10 }, net: 7777, charge: 0 },
			},
			USD: {
				expected: { fee: { other: 20 }, net: 10, charge: 1 },
				outcome: { fee: { other: 20 }, net: 7782, charge: 1 },
			},
		})
	})
	it("add collected", () => {
		expect(
			pax2pay.Settlement.Totals.add(totals2, {
				USD: { collected: { transactions: { net: "aaaa", fee: "bbb", charge: "cccc" } } },
			})
		).toEqual({
			USD: {
				collected: { transactions: { fee: "bbb", net: "aaaa", charge: "cccc" } },
				expected: { fee: { other: 20 }, net: 5, charge: 1 },
				outcome: { fee: { other: 20 }, net: 7777, charge: 1 },
			},
		})
	})
	it("add settled", () => {
		expect(
			pax2pay.Settlement.Totals.add(totals2, {
				USD: { settled: { net: 123, transactions: ["aaaa", "bbbb"] } },
			})
		).toEqual({
			USD: {
				expected: { fee: { other: 20 }, net: 5, charge: 1 },
				outcome: { fee: { other: 20 }, net: 7777, charge: 1 },
				settled: { net: 123, transactions: ["aaaa", "bbbb"] },
			},
		})
	})
})

const totals: pax2pay.Settlement.Totals = {
	USD: { expected: { net: 5, charge: 3, fee: { other: 10 } }, outcome: { net: 5, charge: 3, fee: { other: 10 } } },
}
const totals2: pax2pay.Settlement.Totals = {
	USD: { expected: { net: 5, charge: 1, fee: { other: 10 } }, outcome: { net: 7777, charge: 1, fee: { other: 10 } } },
}
const totals3: pax2pay.Settlement.Totals = {
	USD: { expected: { net: 5, charge: 1, fee: { other: 10 } }, outcome: { net: 5, charge: 1, fee: { other: 10 } } },
	BOV: { expected: { net: 5, charge: 2, fee: { other: 10 } }, outcome: { net: 7777, charge: 2, fee: { other: 10 } } },
}
const totals4: pax2pay.Settlement.Totals = {
	USD: {
		expected: { net: 5, charge: 1, fee: { other: 10 } },
		collected: { transactions: { charge: "aaa", fee: "bbbb", net: "cccc" } },
	},
}
const totals5: pax2pay.Settlement.Totals = {
	USD: {
		expected: { net: 5, charge: 1, fee: { other: 10 } },
		collected: { transactions: { charge: "aaa", fee: "", net: "cccc" } },
	},
}
