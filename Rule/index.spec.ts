import { pax2pay } from "../index"

export const transaction1: pax2pay.Transaction.Creatable = {
	counterpart: {
		identifier: "bvMkSwAG",
		type: "internal",
	},
	currency: "GBP",
	amount: 501,
	description: "test transaction 14",
}
export const transaction2: pax2pay.Transaction.Creatable = {
	counterpart: {
		iban: "GB13CLRB04081800000119",
		type: "iban",
		holder: "ACME",
	},
	currency: "GBP",
	amount: 11,
	description: "test transaction 14",
}
export const transaction3: pax2pay.Transaction.Creatable = {
	counterpart: {
		iban: "GB13CLRB04081800000119",
		type: "iban",
		holder: "ACME",
	},
	currency: "GBP",
	amount: -500,
	description: "test transaction 14",
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
const rule1: pax2pay.Rule = {
	name: "amount limit",
	type: "inbound",
	flags: [],
	description: "",
	action: "reject",
	condition: "transaction.amount>200",
}
const rule2: pax2pay.Rule = {
	name: "reject internal transactions",
	type: "inbound",
	flags: ["review"],
	description: "",
	action: "flag",
	condition: "isInternal()",
}
const rule3: pax2pay.Rule = {
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
export const dailyRule = {
	name: "Flag daily spending",
	type: "outbound",
	flags: ["daily spending flag"],
	description: "Flag transactions that occur after more than 200 GBP have been spent today",
	action: "flag",
	condition: "account.transactions.today.amount>200",
}
export const dailyTransactionRule = {
	name: "Flag daily outgoing transactions volume",
	type: "outbound",
	flags: ["daily transactions flag"],
	description: "Flag transactions that occur after more than 2 outgoing transactions have occurred in a day",
	action: "flag",
	condition: "account.transactions.outgoing.today.count>2",
}
// TODO: add support for these in card state
export const cardSpendingLimit = {
	name: "single use card",
	type: "authorization",
	flags: [],
	description: "Reject multiple uses of the same card",
	action: "reject",
	condition: "card.used.amount>0",
}
export const cardUsageLimit = {
	name: "single use card",
	type: "authorization",
	flags: [],
	description: "Reject multiple uses of the same card",
	action: "reject",
	condition: "card.used.count>0",
}
describe("definitions", () => {
	const state = pax2pay.Rule.State.from(
		account,
		{
			today: { count: 3, amount: 3 },
			incoming: { today: { count: 1, amount: 1 } },
			outgoing: { today: { count: 1, amount: 1 } },
			card: { today: { count: 1, amount: 1 } },
		},
		transaction1
	)
	it("exceedsAmount", () => {
		expect(pax2pay.Rule.evaluate([rule1], state)).toEqual({
			flag: [],
			reject: [rule1],
			review: [],
		})
	})
	it("isInternal", () => {
		expect(pax2pay.Rule.evaluate([rule2], state)).toEqual({
			review: [],
			reject: [],
			flag: [rule2],
		})
	})
	it("always reject", () => {
		expect(pax2pay.Rule.evaluate([rule3], state)).toEqual({
			review: [],
			reject: [rule3],
			flag: [],
		})
	})
	it("optional authorization", () => {
		expect(pax2pay.Rule.evaluate([rule4], state)).toEqual({
			review: [],
			reject: [rule4],
			flag: [],
		})
	})
	it("many rules", () => {
		expect(pax2pay.Rule.evaluate([rule1, rule2, rule3], state)).toEqual({
			review: [],
			reject: [rule1, rule3],
			flag: [rule2],
		})
	})
})
