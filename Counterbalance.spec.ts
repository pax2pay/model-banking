import { pax2pay } from "./index"

describe("Counterbalances", () => {
	it("Counterbalance Link is", () => {
		expect(pax2pay.Counterbalance.Sink.is(`paxgiro-safe01`)).toBeTruthy()
		expect(pax2pay.Counterbalance.Link.is(`paxgiro-safe01`)).toBeTruthy()
	})
	it("Counterbalance.add", () => {
		const Counterbalance1: pax2pay.Counterbalance = { minted: { [`paxgiro-safe01`]: 123 }, burned: {} }
		const Counterbalance: pax2pay.Counterbalance = {
			minted: { [`paxgiro-safe01`]: 123, [`clearbank-safe01`]: 123 },
			burned: {},
		}
		expect(pax2pay.Counterbalance.add("USD", Counterbalance1, Counterbalance)).toEqual({
			minted: { [`paxgiro-safe01`]: 246, [`clearbank-safe01`]: 123 },
			burned: {},
		})
	})
})
