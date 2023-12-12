import { Amounts } from "./Amounts"

describe("Amounts", () => {
	it("subtracts", () => {
		const minuend: Amounts = { GBP: 200, USD: 100 }
		const subtrahend1: Amounts = { GBP: 101 }
		const subtrahend2: Amounts = { GBP: 300 }
		const subtrahend3: Amounts = { GBP: 200 }
		const subtrahend4: Amounts = { PLN: 200 }
		expect(Amounts.subtract(minuend, subtrahend1)).toEqual({ GBP: 99, USD: 100 })
		expect(Amounts.subtract(minuend, subtrahend2)).toEqual({ GBP: -100, USD: 100 })
		expect(Amounts.subtract(minuend, subtrahend3)).toEqual({ USD: 100 })
		expect(Amounts.subtract(minuend, subtrahend4)).toEqual({ GBP: 200, USD: 100, PLN: -200 })
	})
})
