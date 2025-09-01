import { pax2pay } from "../index"

// cSpell:disable
const transaction1: pax2pay.Transaction.Creatable.Resolved = {
	counterpart: { identifier: "bvMkSwAG", type: "paxgiro" },
	currency: "GBP",
	amount: 501,
	description: "test transaction 14",
}
const account: pax2pay.Account = {
	organization: "bigboys",
	name: "A name",
	id: "aaaaaa",
	created: "2023-07-20T17:00.000Z",
	status: { mode: "active" },
	rails: [],
	balances: { GBP: { actual: 0, incomingReserved: 0, outgoingReserved: 0 } },
}
const organization: pax2pay.Rule.State.Organization = {
	name: "p2p",
	realm: "uk",
	rules: [],
	code: "example",
	groups: ["example"],
}
const card: pax2pay.Rule.State.Card = {
	id: "example",
	created: "2024-12-02",
	realm: "test",
	organization: "p2p",
	account: account.id,
	preset: "p2p-mc-200",
	scheme: "mastercard",
	details: {
		iin: "example",
		last4: "example",
		expiry: [25, 12],
		holder: "example",
		token: "example",
	},
	limit: 200,
	spent: ["GBP", 0],
	status: "active",
	history: [],
	rules: [
		{
			code: "abc",
			name: "example",
			type: "authorization",
			category: "product",
			condition: "",
			action: "flag",
			flags: ["example"],
			description: "flag transactions with example if they exist",
		},
	],
	meta: { a: "example1", b: [{ c: 2 }] },
	age: pax2pay.Rule.State.Card.ageFromTime("2024-12-01T23:59:59.000Z"),
	original: { currency: "GBP", limit: 200 },
	used: { count: 1, amount: 0, merchants: [] },
	reject: { count: 0 },
	reference: "dfasbdgubs",
}

const rule1: pax2pay.Rule = {
	code: "abc",
	name: "amount limit",
	type: "authorization",
	category: "product",
	flags: [],
	description: "",
	action: "reject",
	condition: "transaction.amount>200",
}
const rule3: pax2pay.Rule = {
	code: "abc",
	name: "amount limit",
	type: "authorization",
	category: "product",
	flags: [],
	description: "",
	action: "reject",
	condition: "alwaysTrue()",
}
const rule4: pax2pay.Rule = {
	code: "abc",
	name: "amount limit",
	type: "authorization",
	category: "product",
	flags: [],
	description: "",
	action: "reject",
	condition: "alwaysTrue()",
}
const riskCheck: pax2pay.Rule = {
	code: "risk-check-test",
	name: "risk check test",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "Reject if risk is more than 500",
	action: "reject",
	condition: "transaction.risk > 500",
}
const groupRule: pax2pay.Rule = {
	code: "group-rule",
	name: "group rule",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "reject if aldready has been used",
	action: "reject",
	condition: "transaction.amount>10",
	groups: ["example"],
}
const presetRule: pax2pay.Rule = {
	code: "preset-rule",
	name: "preset rule",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "reject if aldready has been used",
	action: "reject",
	condition: "card.used.count>0",
	presets: ["p2p-mc-200"],
}
function getState(
	type: "internal" | "external" | "card",
	stage: "initiate" | "finalize",
	kind: pax2pay.Rule.Kind
): pax2pay.Rule.State {
	return pax2pay.Rule.State.from(
		{
			countries: { eea: ["AD"], sanctioned: ["AD"], risk: { high: ["AD"], mediumHigh: ["AD"] } },
			merchant: {
				known: [],
				categories: { payment: [], crypto: [], gambling: [], travel: [], specialist: [], media: [], sabre: [] },
			},
		},
		account,
		{ type: "card", iin: "111111", scheme: "visa", last4: "1234", id: "", expiry: [25, 12], holder: "" },
		{
			today: { count: 3, amount: 3 },
			incoming: { today: { count: 1, amount: 1 } },
			outgoing: { today: { count: 1, amount: 1 } },
			card: { today: { count: 1, amount: 1 } },
		},
		{ currency: 1, merchant: { category: 1, country: 1, name: 1 } },
		{
			...transaction1,
			counterpart:
				type == "card"
					? {
							type: "card",
							acquirer: { id: "abc", number: "123" },
							merchant: {
								name: "string",
								id: "string",
								category: "string",
								address: "string",
								city: "string",
								zip: "string",
								country: "GB",
							},
					  }
					: type == "external"
					? transaction1.counterpart
					: { type: "internal", identifier: "abcd1234" },
		},
		kind,
		stage,
		card,
		organization
	)
}
describe("definitions", () => {
	it("exceedsAmount", () => {
		expect(pax2pay.Rule.evaluate([rule1], getState("card", "initiate", "authorization")).outcomes).toEqual({
			flag: [],
			reject: [rule1],
			review: [],
		})
	})
	it("always reject", () => {
		expect(pax2pay.Rule.evaluate([rule3], getState("card", "initiate", "authorization")).outcomes).toEqual({
			review: [],
			reject: [rule3],
			flag: [],
		})
	})
	it("optional authorization", () => {
		expect(pax2pay.Rule.evaluate([rule4], getState("card", "initiate", "authorization")).outcomes).toEqual({
			review: [],
			reject: [rule4],
			flag: [],
		})
	})
	it("many rules", () => {
		expect(pax2pay.Rule.evaluate([rule1, rule3], getState("card", "initiate", "authorization")).outcomes).toEqual({
			review: [],
			reject: [rule1, rule3],
			flag: [],
		})
	})
	it("group rule", () => {
		const ev = pax2pay.Rule.evaluate([groupRule], getState("card", "initiate", "authorization"))
		expect(ev.outcomes).toEqual({
			review: [],
			reject: [groupRule],
			flag: [],
		})
	})
	it("preset rule", () => {
		const evaluated = pax2pay.Rule.evaluate([presetRule], getState("card", "initiate", "authorization"))
		expect(evaluated.outcomes).toEqual({
			review: [],
			reject: [presetRule],
			flag: [],
		})
	})
})
