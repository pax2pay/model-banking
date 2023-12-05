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
		identifier: "vUpGSE7u",
	},
	currency: "GBP",
	description: "Collect fee-paxgiro-33303.",
	organization: "paxair",
	accountId: "mK9nmT1S",
	account: {
		type: "internal",
		identifier: "mK9nmT1S",
	},
	id: "zzzyRwPD5J2lIDzU",
	posted: "2023-12-05T10:06:55.167Z",
	balance: 0,
	operations: [
		{
			account: "mK9nmT1S",
			currency: "GBP",
			type: "collect",
			changes: {
				"fee-paxgiro-33303": {
					type: "subtract",
					amount: 10,
					status: "success",
					result: 0,
				},
			},
			transaction: "zzzyRwPD5J2lIDzU",
			counter: 0,
			created: "2023-12-05T10:06:55.167Z",
		},
	],
	status: "created",
	flags: [],
	oldFlags: [],
	notes: [],
}
