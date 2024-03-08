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
