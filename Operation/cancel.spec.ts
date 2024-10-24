import { pax2pay } from "../index"
import { data } from "./data"

describe("cancel", () => {
	it("should create a cancel operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.cancel(data.transaction.incoming)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				"reserved-incoming": { amount: 161, status: "pending", type: "subtract" },
				"test-pxg-safe01-2024-10-16T12Z": { amount: 161, status: "pending", type: "add" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLf41hMGiz10",
			type: "collect",
		})
	})
})
