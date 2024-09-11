import { pax2pay } from "./index"

describe("Balances", () => {
	it("Balances.is", () => {
		const balances: pax2pay.Balances = {
			AED: { actual: 110 },
			USD: { outgoingReserved: 100, incomingReserved: 100, actual: 200 },
		}
		expect(pax2pay.Balances.is(balances)).toEqual(true)
	})
	it("Balances.fromLegacy", () => {
		const legacy: pax2pay.Balances = {
			USD: { outgoingReserved: 100, incomingReserved: 100, actual: 300 },
		}
		const modern: pax2pay.Balances = {
			USD: {
				available: 100,
				reserved: { in: 100, out: 100 },
				outgoingReserved: 100,
				incomingReserved: 100,
				actual: 300,
			},
		}
		expect(pax2pay.Balances.fromLegacy(legacy)).toEqual(modern)
	})
	it("several Balances.fromLegacy", () => {
		const legacy: pax2pay.Balances = {
			USD: { outgoingReserved: 100, incomingReserved: 100, actual: 300 },
			GBP: { outgoingReserved: 100, incomingReserved: 100, actual: 300 },
		}
		const modern: pax2pay.Balances = {
			USD: {
				available: 100,
				reserved: { in: 100, out: 100 },
				outgoingReserved: 100,
				incomingReserved: 100,
				actual: 300,
			},
			GBP: {
				available: 100,
				reserved: { in: 100, out: 100 },
				outgoingReserved: 100,
				incomingReserved: 100,
				actual: 300,
			},
		}
		expect(pax2pay.Balances.fromLegacy(legacy)).toEqual(modern)
	})
	it("Balance.computeActual", () => {
		const balance: pax2pay.Balance = {
			available: 100,
			reserved: { in: 100, out: 100 },
		}
		expect(pax2pay.Balance.computeActual("USD", balance)).toEqual(["USD", 300])
	})
	it("Balances.computeActual", () => {
		const balances: pax2pay.Balances = {
			USD: {
				available: 100,
				reserved: { in: 100, out: 100 },
			},
			GBP: {
				available: 100,
				reserved: { in: 100, out: 100 },
			},
		}
		expect(pax2pay.Balances.computeActual(balances)).toEqual({ USD: 300, GBP: 300 })
	})
})
