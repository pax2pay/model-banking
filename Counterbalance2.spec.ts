import { pax2pay } from "./index"

describe("Counterbalances", () => {
	it("Counterbalance2 Link is", () => {
		expect(pax2pay.Counterbalance2.Sink.is(`paxgiro-safe01`)).toBeTruthy()
		expect(pax2pay.Counterbalance2.Link.is(`paxgiro-safe01`)).toBeTruthy()
	})
	it("Counterbalance2.add", () => {
		const Counterbalance1: pax2pay.Counterbalance2 = { minted: { [`paxgiro-safe01`]: 123 }, burned: {} }
		const Counterbalance2: pax2pay.Counterbalance2 = {
			minted: { [`paxgiro-safe01`]: 123, [`clearbank-safe01`]: 123 },
			burned: {},
		}
		expect(pax2pay.Counterbalance2.add("USD", Counterbalance1, Counterbalance2)).toEqual({
			minted: { [`paxgiro-safe01`]: 246, [`clearbank-safe01`]: 123 },
			burned: {},
		})
	})
})
