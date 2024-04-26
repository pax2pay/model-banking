import { pax2pay } from "../index"

// cSpell:disable
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
	category: "product",
	flags: [],
	description: "",
	action: "reject",
	condition: "transaction.amount>200",
}
const rule2: pax2pay.Rule = {
	name: "reject internal transactions",
	type: "inbound",
	category: "product",
	flags: ["review"],
	description: "",
	action: "flag",
	condition: "isInternal()",
}
const rule3: pax2pay.Rule = {
	name: "amount limit",
	type: "inbound",
	category: "product",
	flags: [],
	description: "",
	action: "reject",
	condition: "alwaysTrue()",
}
const rule4: pax2pay.Rule = {
	name: "amount limit",
	type: "authorization",
	category: "product",
	flags: [],
	description: "",
	action: "reject",
	condition: "alwaysTrue()",
}
export const dailyRule = {
	name: "Flag daily spending",
	type: "outbound",
	category: "product",
	flags: ["daily spending flag"],
	description: "Flag transactions that occur after more than 200 GBP have been spent today",
	action: "flag",
	condition: "account.transactions.today.amount>200",
}
export const dailyTransactionRule = {
	name: "Flag daily outgoing transactions volume",
	type: "outbound",
	category: "product",
	flags: ["daily transactions flag"],
	description: "Flag transactions that occur after more than 2 outgoing transactions have occurred in a day",
	action: "flag",
	condition: "account.transactions.outgoing.today.count>2",
}
// TODO: add support for these in card state
export const cardSpendingLimit = {
	name: "single use card",
	type: "authorization",
	category: "product",
	flags: [],
	description: "Reject multiple uses of the same card",
	action: "reject",
	condition: "card.used.amount>0",
}
export const cardUsageLimit = {
	name: "single use card",
	type: "authorization",
	category: "product",
	flags: [],
	description: "Reject multiple uses of the same card",
	action: "reject",
	condition: "card.used.count>0",
}
export const score: pax2pay.Rule = {
	name: "risk score test",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "multiply risk by 600",
	action: "score",
	risk: 600,
	condition: "transaction.amount > 1",
}
export const riskCheck: pax2pay.Rule = {
	name: "risk check test",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "Reject if risk is more than 500",
	action: "reject",
	condition: "transaction.risk > 500",
}
export const riskFlag: pax2pay.Rule = {
	name: "risk check flag test",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "flag if risk is less than 500",
	action: "flag",
	condition: "transaction.risk < 500",
}

describe("definitions", () => {
	const state = pax2pay.Rule.State.from(
		{
			countries: {
				eea: ["AD"],
				sanctioned: ["AD"],
				risk: { high: ["AD"], mediumHigh: ["AD"] },
			},
			merchant: {
				known: [],
				categories: {
					payment: [],
					crypto: [],
					gambling: [],
					travel: [],
					specialist: [],
					media: [],
					sabre: [],
				},
			},
		},
		account,
		{
			today: { count: 3, amount: 3 },
			incoming: { today: { count: 1, amount: 1 } },
			outgoing: { today: { count: 1, amount: 1 } },
			card: { today: { count: 1, amount: 1 } },
		},
		{ currency: 1, merchant: { category: 1, country: 1, name: 1 } },
		transaction1
	)
	it("exceedsAmount", () => {
		expect(pax2pay.Rule.evaluate([rule1], state)).toEqual({
			flag: [],
			reject: [rule1],
			review: [],
		})
	})
	it("more risk", () => {
		expect(pax2pay.Rule.evaluate([score, riskCheck], state)).toEqual({
			flag: [],
			reject: [riskCheck],
			review: [],
			risk: 600,
		})
	})
	it("less risk", () => {
		expect(pax2pay.Rule.evaluate([score, riskFlag], state)).toEqual({
			flag: [],
			reject: [],
			review: [],
			risk: 600,
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

export const realmWideUKRules: pax2pay.Rule[] = [
	{
		name: "Sanctioned Countries and Territories",
		description: "Reject transactions to merchants in sanctioned countries.",
		action: "reject",
		type: "authorization",
		category: "fincrime",
		condition: "authorization.merchant.country:within(data.countries.sanctioned)",
		flags: ["sanctioned", "country"],
	},
	{
		name: "Single Use",
		description: "Reject authorization if card already has performed an authorization.",
		action: "flag",
		type: "authorization",
		category: "product",
		condition: "card.used.count>0",
		flags: ["strict single use"],
	},
	{
		name: "Single Use",
		description:
			"Reject authorization if card has previously been used to authorize more than 2 GBP in total. Allows for probing auths.",
		action: "flag",
		type: "authorization",
		category: "product",
		condition: "card.used.amount>2 | card.used.count>1",
		flags: ["single use"],
	},
	{
		name: "Only Low Risk Countries",
		description: "Reject transactions to merchants not in a low risk country.",
		action: "reject",
		type: "authorization",
		category: "fincrime",
		condition: "!authorization.merchant.country:within(data.countries.risk.low)",
		flags: ["not low", "country"],
	},
	{
		name: "Too High Amount",
		description: "Reject authorizations with an amount above 2500 GBP.",
		action: "flag",
		type: "authorization",
		category: "product",
		condition: "!transaction.amount>2500",
		flags: ["too high amount"],
	},
	{
		name: "High Risk Country",
		description: "Flag authorizations to merchants from high risk countries.",
		action: "flag",
		type: "authorization",
		category: "fincrime",
		condition: "authorization.merchant.country:within(data.countries.risk.high)",
		flags: ["high risk", "country"],
	},
	{
		name: "Medium High Risk Country",
		description: "Flag authorizations to merchants from medium high risk countries.",
		action: "flag",
		type: "authorization",
		category: "fincrime",
		condition: "authorization.merchant.country:within(data.countries.risk.mediumHigh)",
		flags: ["medium high", "country"],
	},
	{
		name: "Low Amount",
		description: "Flag authorizations with an amount below 5 GBP.",
		action: "flag",
		type: "authorization",
		category: "product",
		condition: "!transaction.amount<5",
		flags: ["low amount"],
	},
	{
		name: "High Amount",
		description: "Flag authorizations with an amount above 800 GBP.",
		action: "flag",
		type: "authorization",
		category: "product",
		condition: "!transaction.amount>800",
		flags: ["high amount"],
	},
	{
		name: "New Merchant",
		description: "Flag authorizations involving a new merchant.",
		action: "flag",
		type: "authorization",
		category: "fincrime",
		condition: "!authorization.merchant.name.within(data.merchant.known)",
		flags: ["new merchant"],
	},
]
