import "jest"
import { pax2pay } from "./index"

describe("library", () => {
	it("a", () => {
		expect(true).toEqual(true)
	})
	it("transaction is", () => {
		expect(
			pax2pay.Transaction.is({
				account: { type: "internal", identifier: "6gpfb4Bf" },
				accountId: "6gpfb4Bf",
				amount: -1,
				balance: 6993,
				counterpart: { identifier: "ENycgXna", type: "internal" },
				currency: "GBP",
				description: "test",
				id: "V1uV3dB8",
				notes: [],
				operations: [
					{
						id: "g7NWpbFl",
						created: "2023-03-17T12:26:10.575Z",
						transactionId: "V1uV3dB8",
						currency: "GBP",
						change: {
							outgoingReserved: { amount: 1, result: 1, status: "success", type: "add" },
						},
					},
					{
						id: "hiwWqILu",
						created: "2023-03-17T12:27:08.608Z",
						transactionId: "V1uV3dB8",
						currency: "GBP",
						change: {
							actual: { amount: 1, result: 6993, status: "success", type: "subtract" },
							outgoingReserved: { amount: 1, result: 0, status: "success", type: "subtract" },
						},
					},
				],
				organization: "RBhssR36",
				posted: "2023-03-17T12:26:10.575Z",
				status: "finalized",
				transacted: "2023-03-17T12:27:08.624Z",
			})
		).toBeTruthy()
	})
})
