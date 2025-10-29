import { pax2pay } from "../../../index"
import { Exchange } from "../../../Transaction/Exchange"
import { Fx } from "./index"

describe("Account.Charge.Fx", () => {
	it("is", () => {
		expect(Fx.type.is(charge)).toBeTruthy()
	})
	it("charge should apply to transaction with default rate", () => {
		expect(Fx.evaluate(charge, "EUR", 100, "test-ta-mc-200", exchange)).toMatchInlineSnapshot(`
			{
			  "amount": -1,
			  "preset": "default",
			  "rate": 0.01,
			}
		`)
	})
	it("charge should apply to transaction with preset rate", () => {
		expect(Fx.evaluate(charge, "EUR", 100, "test-ta-pg-200", exchange)).toMatchInlineSnapshot(`
			{
			  "amount": -2.5,
			  "preset": "test-ta-pg-200",
			  "rate": 0.025,
			}
		`)
	})
	it("charge should apply to transaction with preset rate", () => {
		expect(Fx.evaluate(charge, "EUR", 100, "test-ta-pg-200", exchange)).toMatchInlineSnapshot(`
			{
			  "amount": -2.5,
			  "preset": "test-ta-pg-200",
			  "rate": 0.025,
			}
		`)
	})
	it("charge should not apply", () => {
		expect(Fx.evaluate(charge, "EUR", 100, "test-ta-pg-200", undefined)).toMatchInlineSnapshot(`undefined`)
	})
})
const charge: pax2pay.Account.Charge.Fx = {
	"test-ta-pg-200": 0.025,
	default: 0.01,
}
export const exchange: Exchange = { from: ["USD", 100], rate: 1 }
