import { pax2pay } from "."

describe("Transaction.Fx", () => {
	it("should include fx quote charge", () => {
		const fromQuote: pax2pay.fx.Quote = {
			account: { id: "", fx: { markup: 0.1 } },
			created: "",
			expires: "",
			fixed: "from",
			from: { currency: "EUR", amount: 100 },
			to: { currency: "GBP", amount: 72.73 },
			id: "fxId",
			rate: { base: 0.8, effective: 0.7272727, markup: 0.1 },
		}
		const toQuote: pax2pay.fx.Quote = {
			account: { id: "", fx: { markup: 0.1 } },
			created: "",
			expires: "",
			fixed: "to",
			from: { currency: "EUR", amount: 137.5 },
			to: { currency: "GBP", amount: 100 },
			id: "fxId",
			rate: { base: 0.8, effective: 0.7272727, markup: 0.1 },
		}
		expect(pax2pay.fx.Quote.toCharge(fromQuote)).toEqual({ fx: { amount: 9.09, preset: "default", rate: 0.1 } })
		expect(pax2pay.fx.Quote.toCharge(toQuote)).toEqual({ fx: { amount: 12.5, preset: "default", rate: 0.1 } })
	})
})
