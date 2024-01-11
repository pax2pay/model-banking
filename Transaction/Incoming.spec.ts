import { pax2pay } from "../index"

describe("Transaction", () => {
	it("is", () => {
		expect(pax2pay.Transaction.is(transaction)).toBeTruthy()
	})
})
const transaction = {
	amount: -10,
	counterpart: {
		type: "internal",
		identifier: "IkToJ5Ep",
	},
	currency: "GBP",
	description: "Collect fee_test-paxgiro_202333303.",
	organization: "paxair",
	accountId: "3Lb41MlP",
	account: {
		type: "internal",
		identifier: "3Lb41MlP",
	},
	id: "zzzyRwIvXovdzVNA",
	posted: "2023-12-05T17:26:36.977Z",
	balance: 0,
	operations: [
		{
			account: "3Lb41MlP",
			currency: "GBP",
			type: "collect",
			changes: {
				"fee_test-paxgiro_202333303": {
					type: "subtract",
					amount: 10,
					status: "success",
					result: 0,
				},
			},
			transaction: "zzzyRwIvXovdzVNA",
			counter: 0,
			created: "2023-12-05T17:26:36.977Z",
		},
	],
	status: "created",
	rail: "paxgiro",
	flags: [],
	oldFlags: [],
	notes: [],
}
