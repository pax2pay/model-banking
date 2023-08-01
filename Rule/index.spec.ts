import { pax2pay } from "../index"

const rule1: pax2pay.Organization.Rule = {
	name: "amount limit",
	type: "inbound",
	flags: [],
	description: "",
	action: "reject",
	condition: "transaction.amount>200",
}
const rule2: pax2pay.Organization.Rule = {
	name: "reject internal transactions",
	type: "inbound",
	flags: ["review"],
	description: "",
	action: "flag",
	condition: "isInternal()",
}
const rule3: pax2pay.Organization.Rule = {
	name: "amount limit",
	type: "inbound",
	flags: [],
	description: "",
	action: "reject",
	condition: "alwaysTrue()",
}
const rule4: pax2pay.Rule = {
	name: "amount limit",
	type: "authorization",
	flags: [],
	description: "",
	action: "reject",
	condition: "alwaysTrue()",
}
describe("definitions", () => {
	it("exceedsAmount", () => {
		expect(pax2pay.Rule.evaluate([rule1], { transaction: transaction1, account: account })).toEqual({
			flag: [],
			reject: [rule1],
			review: [],
		})
	})
	it("isInternal", () => {
		expect(pax2pay.Rule.evaluate([rule2], { transaction: transaction1, account: account })).toEqual({
			review: [],
			reject: [],
			flag: [rule2],
		})
	})
	it("always reject", () => {
		expect(pax2pay.Rule.evaluate([rule3], { transaction: transaction1, account: account })).toEqual({
			review: [],
			reject: [rule3],
			flag: [],
		})
	})
	it("optional authorization", () => {
		expect(pax2pay.Rule.evaluate([rule4], { transaction: transaction1, account: account })).toEqual({
			review: [],
			reject: [rule4],
			flag: [],
		})
	})
	it("many rules", () => {
		expect(pax2pay.Rule.evaluate([rule1, rule2, rule3], { transaction: transaction1, account: account })).toEqual({
			review: [],
			reject: [rule1, rule3],
			flag: [rule2],
		})
	})
})

export const transaction1: pax2pay.Transaction = {
	organization: "aaaaaaaa",
	accountId: "bbbbbbbb",
	account: {
		identifier: "fLBpNiiA",
		type: "internal",
	},
	id: "RT0QUi8m",
	posted: "2023-02-23T12:25:13.371Z",
	balance: 57532,
	counterpart: {
		identifier: "bvMkSwAG",
		type: "internal",
	},
	currency: "GBP",
	amount: 501,
	description: "test transaction 14",
	operations: [],
	transacted: "2023-02-23T16:14:52.309Z",
	status: "approved",
	flags: [],
	notes: [],
}
export const transaction2: pax2pay.Transaction = {
	organization: "aaaaaaaa§",
	accountId: "bbbbbbbb",
	account: {
		type: "iban",
		iban: "GB72CLRB04081800000124",
		holder: "ACME",
	},
	id: "RT0QUi8m",
	posted: "2023-02-23T12:25:13.371Z",
	balance: 57532,
	counterpart: {
		iban: "GB13CLRB04081800000119",
		type: "iban",
		holder: "ACME",
	},
	currency: "GBP",
	amount: 11,
	description: "test transaction 14",
	operations: [],
	transacted: "2023-02-23T16:14:52.309Z",
	status: "approved",
	flags: [],
	notes: [],
}
export const transaction3: pax2pay.Transaction = {
	organization: "aaaaaaaa§",
	accountId: "bbbbbbbb",
	account: {
		type: "iban",
		iban: "GB72CLRB04081800000124",
		holder: "ACME",
	},
	id: "RT0QUi8m",
	posted: "2023-02-23T12:25:13.371Z",
	balance: 57532,
	counterpart: {
		iban: "GB13CLRB04081800000119",
		type: "iban",
		holder: "ACME",
	},
	currency: "GBP",
	amount: -500,
	description: "test transaction 14",
	operations: [],
	transacted: "2023-02-23T16:14:52.309Z",
	status: "approved",
	flags: [],
	notes: [],
}
export const account: pax2pay.Account = {
	name: "A name",
	id: "aaaaaa",
	created: "2023-07-20T17:00.000Z",
	rails: [],
	balances: {
		GBP: {
			actual: 0,
			incomingReserved: 0,
			outgoingReserved: 0,
		},
	},
}
