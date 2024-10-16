import { Authorization } from "../../Authorization"
import { Settlement } from "../../Settlement"

export const capture: Settlement.Entry.Capture.Creatable = {
	type: "capture",
	authorization: {
		id: "auth123",
		status: "approved",
		amount: ["GBP", 161],
		created: new Date().toISOString(),
	} as Authorization,
	reference: "txn123",
	batch: "batch123",
	fee: {
		other: { GBP: 1 },
	},
	amount: ["GBP", 160],
}
