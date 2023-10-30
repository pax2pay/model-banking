import { pax2pay } from "../index"

describe("Balances", () => {
	it("Balances.is", () => {
		const balances: pax2pay.Balances = {
			AED: { actual: 110 },
			USD: { outgoingReserved: 100, incomingReserved: 100, actual: 200 },
		}
		expect(pax2pay.Balances.is(balances)).toEqual(true)
	})
	it("Balances.Balance.add", () => {
		const balance1: pax2pay.Balances.Balance = { actual: 123 }
		const balance2: pax2pay.Balances.Balance = { actual: 123, incomingReserved: 789 }
		expect(pax2pay.Balances.Balance.add(balance1, balance2, "USD")).toEqual({
			actual: 246,
			incomingReserved: 789,
		})
	})
	it("Balances.add", () => {
		const balances1: pax2pay.Balances = {
			USD: { actual: 123 },
			GBP: { incomingReserved: 999 },
			SEK: { incomingReserved: 999 },
		}
		const balances2: pax2pay.Balances = { USD: { actual: 123, outgoingReserved: 789 } }
		expect(pax2pay.Balances.add(balances1, balances2)).toEqual({
			USD: {
				actual: 246,
				outgoingReserved: 789,
			},
			GBP: {
				incomingReserved: 999,
			},
			SEK: {
				incomingReserved: 999,
			},
		})
	})
})
