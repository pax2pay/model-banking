import { pax2pay } from "../../index"

// cSpell:disable
describe("Transaction", () => {
	it("is", () => {
		expect(pax2pay.Transaction.type.is(transaction)).toBeTruthy()
	})
})
const transaction: pax2pay.Transaction = {
	amount: { original: -10, charge: 0, reserved: 0, total: -10 },
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
	type: "internal",
	direction: "outbound",
	posted: "2023-12-05T17:26:36.977Z",
	balance: {
		actual: 420,
		reserved: 420,
		available: 420,
	},
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
	status: "review",
	rail: "paxgiro",
	flags: [],
	oldFlags: [],
	notes: [],
}
