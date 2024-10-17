import { pax2pay } from "../index"
import { data } from "./data"

describe("buffer", () => {
	it("should create a buffer operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.buffer(
			data.transaction.incoming.id,
			data.transaction.incoming.currency,
			data.transaction.incoming.amount.total,
			"wIJxbBFE"
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				"reserved-buffer": { amount: 161, status: "pending", type: "add" },
				available: { amount: 161, status: "pending", type: "subtract" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLf41hMGiz10",
			type: "adjustBuffer",
		})
	})
})
