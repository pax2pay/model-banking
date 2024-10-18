import { pax2pay } from "../index"
import { data } from "./data"

describe("Incoming", () => {
	it("should create an initiate operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.incoming.initiate(
			data.transaction.incoming.id,
			data.state.incoming,
			data.counterbalance
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				[data.counterbalance]: {
					amount: 161,
					status: "pending",
					type: "subtract",
				},
				"reserved-incoming": { amount: 161, status: "pending", type: "add" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLf41hMGiz10",
			type: "incoming",
		})
	})
	it("should create a finalize operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.incoming.finalize(
			data.transaction.incoming,
			"wIJxbBFE",
			data.state.incoming
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
			type: "finalizeIncoming",
		})
	})
})
