import { pax2pay } from "../index"
import { data } from "./data"

describe("collect", () => {
	it("should create a collect operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.collect(
			data.transaction.card.id,
			data.state.incoming,
			data.counterbalance
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				available: { amount: 161, status: "pending", type: "add" },
				[data.counterbalance]: { amount: 161, status: "pending", type: "subtract" },
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLlMrZb-UCsk",
			type: "collect",
		})
	})
})
