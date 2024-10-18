import { pax2pay } from "../index"
import { data } from "./data"

describe("Outgoing Operations", () => {
	it("should create a initial refund operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.refund.initiate(
			data.transaction.incoming.id,
			data.state.incoming,
			data.refund,
			data.settlement
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				"reserved-incoming": { amount: 161, status: "pending", type: "add" },
				"test-settlement-fee": { amount: 1, status: "pending", type: "subtract" },
				"test-settlement-net": { amount: 160, status: "pending", type: "subtract" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLf41hMGiz10",
			type: "refund",
		})
	})
	it("should create a finalized refund operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.refund.finalize(
			data.transaction.incoming,
			data.state.incoming,
			data.refund,
			data.settlement
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				available: { amount: 161, status: "pending", type: "add" },
				"reserved-incoming": { amount: 161, status: "pending", type: "subtract" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLf41hMGiz10",
			type: "refund",
		})
	})
})
