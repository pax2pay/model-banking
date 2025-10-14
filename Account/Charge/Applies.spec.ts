import { Exchange } from "../../Transaction/Exchange"
import { Applies } from "./Applies"
import { transaction } from "./index.spec"

describe("Applies", () => {
	it("evaluate fx", () => {
		expect(Applies.Fx.evaluate(true, exchange)).toBeTruthy()
		expect(Applies.Fx.evaluate(undefined, exchange)).toBeTruthy()
		expect(Applies.Fx.evaluate(true, undefined)).toBeFalsy()
	})
	it("evaluate Merchant", () => {
		expect(
			Applies.Merchant.evaluate(["ryanair"], {
				merchant: { name: "RYANAIR", category: "3246", address: "", city: "", country: "AD", zip: "", id: "merchant1" },
			} as any)
		).toBeTruthy()
		expect(Applies.Merchant.evaluate(undefined, {} as any)).toBeTruthy()
		expect(Applies.Merchant.evaluate([], {} as any)).toBeTruthy()
		expect(Applies.Merchant.evaluate(["ryanair"], { merchant: { name: "lufthansa" } as any } as any)).toBeFalsy()
	})
	it("evaluate Preset", () => {
		expect(Applies.Presets.evaluate(["p2p-diners-175"], "p2p-diners-175")).toBeTruthy()
		expect(Applies.Presets.evaluate(["p2p-diners-175"], "p2p-diners-200")).toBeFalsy()
		expect(Applies.Presets.evaluate(["p2p-diners-175"], undefined)).toBeFalsy()
		expect(Applies.Presets.evaluate(undefined, undefined)).toBeTruthy()
		expect(Applies.Presets.evaluate(undefined, "p2p-diners-175")).toBeTruthy()
		expect(Applies.Presets.evaluate([], undefined)).toBeTruthy()
		expect(Applies.Presets.evaluate([], "p2p-diners-175")).toBeTruthy()
	})
	it("evaluate all", () => {
		expect(Applies.evaluate({ to: { merchants: ["ryanair"] } }, transaction.ryanair.counterpart)).toBeTruthy()
		expect(
			Applies.evaluate({ to: { merchants: ["ryanair"], presets: ["test-ta-pg-200"] } }, transaction.ryanair.counterpart)
		).toBeFalsy()
		expect(
			Applies.evaluate(
				{ to: { merchants: ["ryanair"], presets: ["test-ta-pg-200"] } },
				transaction.ryanair.counterpart,
				"test-ta-pg-200"
			)
		).toBeTruthy()
		expect(
			Applies.evaluate({ to: { fx: true } }, transaction.fxCharge.counterpart, "test-ta-pg-200", exchange)
		).toBeTruthy()
		expect(Applies.evaluate({ to: { fx: true } }, transaction.fxCharge.counterpart, undefined, exchange)).toBeTruthy()
		expect(
			Applies.evaluate(
				{ to: { fx: true, presets: ["test-ta-pg-200"] } },
				transaction.fxCharge.counterpart,
				"test-ta-pg-200"
			)
		).toBeFalsy()
	})
})

const exchange: Exchange = { from: ["USD", 100], rate: 1 }
