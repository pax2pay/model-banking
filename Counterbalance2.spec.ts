import { pax2pay } from "./index"

describe("Counterbalances", () => {
	it("Counterbalance2 Link is", () => {
		expect(pax2pay.Counterbalance2.Sink.is(`paxgiro|2023-04-02T14Z`)).toBeTruthy()
		expect(pax2pay.Counterbalance2.Link.is(`paxgiro|2023-04-02T14Z`)).toBeTruthy()
		expect(pax2pay.Counterbalance2.Source.is(`paxaaaagiro|2023-04-02T14Z`)).toBeFalsy()
	})
	it("Counterbalance2.add", () => {
		const Counterbalance1: pax2pay.Counterbalance2 = { minted: { [`paxgiro|2023-04-02T14Z`]: 123 }, burned: {} }
		const Counterbalance2: pax2pay.Counterbalance2 = {
			minted: { [`paxgiro|2023-04-02T14Z`]: 123, [`clearbank|2023-04-02T14Z`]: 123 },
			burned: {},
		}
		expect(pax2pay.Counterbalance2.add("USD", Counterbalance1, Counterbalance2)).toEqual({
			minted: { [`paxgiro|2023-04-02T14Z`]: 246, [`clearbank|2023-04-02T14Z`]: 123 },
			burned: {},
		})
	})
})
