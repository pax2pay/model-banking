import { Authorization } from "../../Authorization"
import { Settlement } from "../../Settlement"

export const refund: Settlement.Entry.Refund.Creatable = {
	type: "refund",
	authorization: {
		id: "auth123",
		status: "approved",
		amount: ["GBP", 161],
		created: new Date().toISOString(),
	} as Authorization,
	reference: "txn123",
	batch: "batch123",
	fee: {
		other: { GBP: -1 },
	},
	amount: ["GBP", -160],
	card: "" as any,
	merchant: "" as any,
	acquirer: "" as any,
}
