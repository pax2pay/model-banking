import { pax2pay } from "../index"
import { data } from "./data"

describe("cancel", () => {
	it("should create a cancel operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.cancel(data.transaction.card, data.state.incoming)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				available: { amount: 161, status: "pending", type: "add" },
				"reserved-outgoing": { amount: 161, status: "pending", type: "subtract" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLlMrZb-UCsk",
			type: "collect",
		})
	})
})
