import { pax2pay } from "./index"

describe("Counterbalances", () => {
	it("Counterbalance Link is", () => {
		expect(pax2pay.Counterbalance.Sink.is(`paxgiro-safe01`)).toBeTruthy()
		expect(pax2pay.Counterbalance.Link.is(`paxgiro-safe01`)).toBeTruthy()
	})
})
