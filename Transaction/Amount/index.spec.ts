import { pax2pay } from "../../index"

// cSpell:disable
describe("Transaction.Amount", () => {
	it("is", () => {
		expect(pax2pay.Transaction.Amount.Charge.Fx.type.is(charges.fx)).toBeTruthy()
	})
})
const charges: pax2pay.Transaction.Amount.Charge = {
	fx: { amount: -10, rate: 0.1, preset: "test-ta-pg-200" },
	merchant: {
		amount: -1,
		merchant: "ryanair",
		rate: 0.01,
		preset: "test-ta-pg-200",
		destination: { account: "abcd1234" },
	},
}
