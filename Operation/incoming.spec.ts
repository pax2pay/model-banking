import { pax2pay } from "../index"
import { data } from "./data"

// jest.mock("./Changes")
// jest.mock("./create")

describe("Incoming", () => {
	it("should create an open operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.incoming.initiate(
			data.transaction.incoming.id,
			data.state.incoming,
			"test-pxg-credit01-2024-10-16T06Z"
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				"test-pxg-credit01-2024-10-16T06Z": {
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
	it("should create a capture operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.incoming.collect(
			data.transaction.card.id,
			data.state.incoming,
			"test-pxg-credit01-2024-10-16T06Z"
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				available: { amount: 161, status: "pending", type: "add" },
				"test-pxg-credit01-2024-10-16T06Z": { amount: 161, status: "pending", type: "subtract" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLlMrZb-UCsk",
			type: "collect",
		})
	})
})

/*
Operation.refund.open
Operation.refund.finalize
Operation.incoming.initiate
Operation.incoming.finalize
Operation.outgoing.open
Operation.outgoing.finalize
Operation.outgoing.capture
Operation.buffer.create
Operation.system.create
*/
