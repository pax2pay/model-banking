import { isoly } from "isoly"
import { pax2pay } from "../index"

// cSpell:disable
const transaction1: pax2pay.Transaction.Creatable & { counterpart: pax2pay.Rail.Address } = {
	counterpart: { identifier: "bvMkSwAG", type: "internal" },
	currency: "GBP",
	amount: 501,
	description: "test transaction 14",
}
const account: pax2pay.Account = {
	name: "A name",
	id: "aaaaaa",
	created: "2023-07-20T17:00.000Z",
	rails: [],
	balances: {
		GBP: { actual: 0, incomingReserved: 0, outgoingReserved: 0 },
	},
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
const rule2: pax2pay.Rule = {
	code: "abc",
	name: "reject internal transactions",
	type: "authorization",
	category: "product",
	flags: ["review"],
	description: "",
	action: "flag",
	condition: "isInternal()",
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
const score: pax2pay.Rule = {
	code: "risk-score-test",
	name: "risk score test",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "multiply risk by 600",
	action: "score",
	risk: 600,
	condition: "transaction.amount > 1",
}
const charge: pax2pay.Rule.Charge = {
	code: "charge-test",
	name: "charge test",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "Charge 1.5% fee.",
	action: "charge",
	fee: { percentage: 1.5 },
	condition: "transaction.amount > 1",
}
const incomingCharge: pax2pay.Rule.Charge = {
	code: "charge-test",
	name: "charge test",
	type: "inbound",
	category: "fincrime",
	flags: [],
	description: "Charge 1.5% fee.",
	action: "charge",
	fee: { percentage: 1.5 },
	condition: "transaction.amount > 1",
}
const notScore: pax2pay.Rule = {
	code: "risk-score-test",
	name: "risk score test",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "multiply risk by 600",
	action: "score",
	risk: 600,
	condition: "transaction.amount < 1",
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
const riskFlag: pax2pay.Rule = {
	code: "risk-check-flag-test",
	name: "risk check flag test",
	type: "authorization",
	category: "fincrime",
	flags: [],
	description: "flag if risk is greater than 500",
	action: "flag",
	condition: "transaction.risk > 500",
}
function getState(kind: pax2pay.Rule.Kind = "authorization"): pax2pay.Rule.State {
	return pax2pay.Rule.State.from(
		{
			countries: { eea: ["AD"], sanctioned: ["AD"], risk: { high: ["AD"], mediumHigh: ["AD"] } },
			merchant: {
				known: [],
				categories: { payment: [], crypto: [], gambling: [], travel: [], specialist: [], media: [], sabre: [] },
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
		transaction1,
		kind
	)
}
describe("definitions", () => {
	it("exceedsAmount", () => {
		expect(pax2pay.Rule.evaluate([rule1], getState()).outcomes).toEqual({
			charge: [],
			flag: [],
			reject: [rule1],
			review: [],
		})
	})
	it("more risk", () => {
		const evaluated = pax2pay.Rule.evaluate([score, riskCheck], getState())
		expect(evaluated.outcome).toEqual("reject")
		expect(evaluated.transaction.risk).toEqual(600)
	})
	it("double risk", () => {
		expect(pax2pay.Rule.evaluate([score, notScore, score, notScore], getState()).transaction.risk).toEqual(3600)
	})
	it("less risk", () => {
		const evaluated = pax2pay.Rule.evaluate([score, riskFlag], getState())
		expect(evaluated.transaction.risk).toEqual(600)
		expect(evaluated.outcome).toEqual("approve")
		expect(evaluated.outcomes.flag).toEqual([riskFlag])
	})
	it("one fee", () => {
		const state = getState()
		const evaluated = pax2pay.Rule.evaluate([charge], state)
		const fee = isoly.Currency.multiply(
			state.transaction.original.currency,
			state.transaction.original.amount,
			charge.fee.percentage / 100
		)
		expect(evaluated.transaction.fee).toEqual(fee)
		expect(evaluated.amount).toEqual(state.transaction.original.amount + fee)
	})
	it("two fees", () => {
		const state = getState()
		const evaluated = pax2pay.Rule.evaluate([charge, charge], state)
		const fee = isoly.Currency.multiply(
			state.transaction.original.currency,
			state.transaction.original.amount,
			(2 * charge.fee.percentage) / 100
		)
		expect(evaluated.transaction.fee).toEqual(fee)
		expect(evaluated.amount).toEqual(state.transaction.original.amount + fee)
	})
	it("fee on incoming", () => {
		const state = getState("inbound")
		const evaluated = pax2pay.Rule.evaluate([incomingCharge], state)
		const fee = isoly.Currency.multiply(
			state.transaction.original.currency,
			state.transaction.original.amount,
			charge.fee.percentage / 100
		)
		expect(evaluated.transaction.fee).toEqual(fee)
		expect(evaluated.amount).toEqual(state.transaction.original.amount - fee)
	})
	it("isInternal", () => {
		expect(pax2pay.Rule.evaluate([rule2], getState()).outcomes).toEqual({
			charge: [],
			review: [],
			reject: [],
			flag: [rule2],
		})
	})
	it("always reject", () => {
		expect(pax2pay.Rule.evaluate([rule3], getState()).outcomes).toEqual({
			charge: [],
			review: [],
			reject: [rule3],
			flag: [],
		})
	})
	it("optional authorization", () => {
		expect(pax2pay.Rule.evaluate([rule4], getState()).outcomes).toEqual({
			charge: [],
			review: [],
			reject: [rule4],
			flag: [],
		})
	})
	it("many rules", () => {
		expect(pax2pay.Rule.evaluate([rule1, rule2, rule3, charge], getState()).outcomes).toEqual({
			charge: [charge],
			review: [],
			reject: [rule1, rule3],
			flag: [rule2],
		})
	})
})
