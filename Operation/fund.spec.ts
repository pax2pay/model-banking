import { isoly } from "isoly"
import { pax2pay } from "../index"
import { data } from "./data"

describe("fund", () => {
	it("should create a fund operation", () => {
		const operation: pax2pay.Operation = pax2pay.Operation.fund(
			data.transaction.incoming.id,
			data.transaction.creatable,
			"wIJxbBFE",
			"example-reference"
		)
		delete (operation as any).created
		expect(operation).toEqual({
			account: "wIJxbBFE",
			changes: {
				available: { amount: 161, status: "pending", type: "add" },
				[`example-reference-${isoly.DateTime.truncate(isoly.DateTime.now(), "hours")}`]: {
					amount: 161,
					status: "pending",
					type: "subtract",
				},
			},
			counter: 0,
			currency: "GBP",
			transaction: "zzzyQLf41hMGiz10",
			type: "fund",
		})
	})
})
