import { pax2pay } from "../index"

describe("Settlement.Totals", () => {
	it("verify", () => {
		expect(pax2pay.Settlement.Totals.verify(totals, "outcome")).toEqual(true)
		expect(pax2pay.Settlement.Totals.verify(totals2, "outcome")).toEqual(false)
		expect(pax2pay.Settlement.Totals.verify(totals3, "outcome")).toEqual(false)
	})
	it("add", () => {
		expect(pax2pay.Settlement.Totals.add(totals, totals2)).toEqual({
			USD: {
				expected: { fee: { other: 20 }, net: 10 },
				outcome: { fee: { other: 20 }, net: 7782 },
			},
		})
	})
	it("add several currencies", () => {
		expect(pax2pay.Settlement.Totals.add(totals2, totals3)).toEqual({
			BOV: { expected: { fee: { other: 10 }, net: 5 }, outcome: { fee: { other: 10 }, net: 7777 } },
			USD: { expected: { fee: { other: 20 }, net: 10 }, outcome: { fee: { other: 20 }, net: 7782 } },
		})
	})
	it("add collected", () => {
		expect(
			pax2pay.Settlement.Totals.add(totals2, {
				USD: { collected: { transactions: { net: "aaaa", charge: "cccc" } } },
			})
		).toEqual({
			USD: {
				collected: { transactions: { net: "aaaa", charge: "cccc" } },
				expected: { fee: { other: 20 }, net: 5 },
				outcome: { fee: { other: 20 }, net: 7777 },
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
				expected: { fee: { other: 20 }, net: 5 },
				outcome: { fee: { other: 20 }, net: 7777 },
				settled: { net: 123, transactions: ["aaaa", "bbbb"] },
			},
		})
	})
})

const totals: pax2pay.Settlement.Totals = {
	USD: { expected: { net: 5, fee: { other: 10 } }, outcome: { net: 5, fee: { other: 10 } } },
}
const totals2: pax2pay.Settlement.Totals = {
	USD: { expected: { net: 5, fee: { other: 10 } }, outcome: { net: 7777, fee: { other: 10 } } },
}
const totals3: pax2pay.Settlement.Totals = {
	USD: { expected: { net: 5, fee: { other: 10 } }, outcome: { net: 5, fee: { other: 10 } } },
	BOV: { expected: { net: 5, fee: { other: 10 } }, outcome: { net: 7777, fee: { other: 10 } } },
}
