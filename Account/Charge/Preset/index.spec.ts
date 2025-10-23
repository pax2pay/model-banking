import { Preset } from "."

describe("Account.Charge.Merchant.Preset", () => {
	it("is", () => {
		expect(Preset.type.is(preset)).toBeTruthy()
	})
})
export const preset: Preset = { "test-ta-pg-200": 0.025, default: 0 }
