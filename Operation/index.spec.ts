import { pax2pay } from "../index"

describe("Operation", () => {
	it("is", () => {
		expect(pax2pay.Operation.is(operation)).toBeTruthy()
	})
})
const operation = {
	account: "Hr_aKwpS",
	currency: "GBP",
	type: "collect",
	changes: {
		"fee-paxgiro-33303": {
			type: "subtract",
			amount: 10,
			status: "success",
			result: 0,
		},
	},
	transaction: "zzzyRwPm8qQmYRk4",
	counter: 0,
	created: "2023-12-05T09:27:32.249Z",
}
