import { isoly } from "isoly"
import { pax2pay } from "../index"

describe("Settlement.Totals", () => {
	it("verify", () => {
		expect(pax2pay.Settlement.Totals.verify(totals, "outcome").every(([_, v]) => v == true)).toEqual(true)
		expect(pax2pay.Settlement.Totals.verify(totals2, "outcome").every(([_, v]) => v == true)).toEqual(false)
	})
	it("some problems", () => {
		const result = pax2pay.Settlement.Totals.verify(totals3, "outcome").reduce(
			(result, [currency, value]) => {
				value ? result.successes.push(currency) : result.problems.push(currency)
				return result
			},
			{ successes: [], problems: [] } as { successes: isoly.Currency[]; problems: isoly.Currency[] }
		)
		expect(result.successes).toEqual(["USD"])
		expect(result.problems).toEqual(["BOV"])
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
				USD: { collected: { net: 123, fee: { other: 5 }, transactions: { net: "aaaa", fee: "bbb" } } },
			})
		).toEqual({
			USD: {
				collected: { fee: { other: 5 }, net: 123, transactions: { fee: "bbb", net: "aaaa" } },
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
