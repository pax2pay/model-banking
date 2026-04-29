import { pax2pay } from "../index"

describe("Changes", () => {
	it("should update correctly", () => {
		expect(pax2pay.Operation.Changes.balance(operation.currency, operation.changes)).toBe(0)
	})
})
const operation: pax2pay.Operation = {
	transaction: "tr_yNXRm2RYVyK8r",
	counter: 1,
	account: "jHX4WyU1",
	type: "authorization",
	created: "2026-04-29T10:34:29.786Z",
	currency: "GBP",
	changes: {
		available: {
			type: "subtract",
			amount: 303.06,
			result: 3418.82,
			status: "success",
		},
		"reserved-outgoing": {
			type: "add",
			amount: 303.06,
			result: 303.06,
			status: "success",
		},
	},
}
