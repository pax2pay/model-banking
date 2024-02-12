import { pax2pay } from "../index"

// cSpell:disable
describe("Operation", () => {
	it("is", () => {
		expect(pax2pay.Operation.is(operation)).toBeTruthy()
	})
})
const operation = {
	account: "3Lb41MlP",
	currency: "GBP",
	type: "collect",
	changes: {
		"fee_test-paxgiro_202333303": {
			type: "subtract",
			amount: 10,
			status: "success",
			result: 0,
		},
	},
	transaction: "zzzyRwIvXovdzVNA",
	counter: 0,
	created: "2023-12-05T17:26:36.977Z",
}
