import { pax2pay } from "../index"

describe("balances", () => {
	it("balances.is", () => {
		const balances: pax2pay.Balances = {
			AED: { actual: 110 },
			USD: { outgoingReserved: 100, incomingReserved: 100, actual: 200 },
		}
		expect(pax2pay.Balances.is(balances)).toEqual(true)
	})
	it("balances.counter.is", () => {
		console.log("counters: ", pax2pay.Balances.Counters.entries)
	})
})
