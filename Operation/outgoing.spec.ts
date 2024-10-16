import { pax2pay } from "../index"
import { data } from "./data"

describe("Outgoing Operations", () => {
	it("should create an open operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.outgoing.initiate(data.transaction.card.id, data.state.card)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "WzauRHBO",
			changes: {
				available: { amount: 161, status: "pending", type: "subtract" },
				"reserved-outgoing": { amount: 161, status: "pending", type: "add" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLlMrZb-UCsk",
			type: "authorization",
		})
	})
	it("should create a finalize operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.outgoing.finalize(
			data.transaction.card,
			data.state.card,
			data.counterbalance
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "WzauRHBO",
			changes: {
				"reserved-outgoing": { amount: 161, status: "pending", type: "subtract" },
				"test-counterbalance": { amount: 161, status: "pending", type: "add" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLlMrZb-UCsk",
			type: "finalizeOutgoing",
		})
	})
	it("should create a capture operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.outgoing.capture(
			data.transaction.card,
			data.state.card,
			data.capture,
			data.settlement
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "WzauRHBO",
			changes: {
				"reserved-outgoing": { amount: 161, status: "pending", type: "subtract" },
				"test-settlement-fee": { amount: 1, status: "pending", type: "add" },
				"test-settlement-net": { amount: 160, status: "pending", type: "add" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLlMrZb-UCsk",
			type: "capture",
		})
	})
})
