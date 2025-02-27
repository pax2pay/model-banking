import { isoly } from "isoly"
import { Exchange } from "../Exchange"
import { pax2pay } from "../index"

// cSpell:disable
const transaction1: pax2pay.Transaction.Creatable.Resolved = {
	counterpart: { identifier: "bvMkSwAG", type: "paxgiro" },
	currency: "GBP",
	amount: 501,
	description: "test transaction 14",
}
const account: pax2pay.Account = {
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
	type: "outbound",
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
const chargePercent: pax2pay.Rule.Charge = {
	code: "charge-test",
	name: "charge test",
	type: "capture",
	category: "fincrime",
	flags: [],
	description: "Charge 1.5% fee.",
	action: "charge",
	charge: { percentage: 1.5 },
	condition: "transaction.amount > 1",
}
const chargeFixed: pax2pay.Rule.Charge = {
	code: "charge-test",
	name: "charge test",
	type: "capture",
	category: "fincrime",
	flags: [],
	description: "Charge 1 GBP fee.",
	action: "charge",
	charge: { fixed: ["GBP", 1] },
	condition: "transaction.amount > 1",
}
const outboundReserve: pax2pay.Rule.Reserve = {
	code: "reserve-test",
	name: "reserve test",
	type: "outbound",
	category: "fincrime",
	flags: [],
	description: "Reserve 1 GBP outbound fee.",
	action: "reserve",
	reserve: { fixed: ["GBP", 1] },
	condition: "transaction.amount > 1",
}
const incomingCharge: pax2pay.Rule.Charge = {
	code: "charge-test",
	name: "charge test",
	type: "inbound",
	category: "fincrime",
	flags: [],
	description: "Charge 1 GBP incoming fee.",
	action: "charge",
	charge: { fixed: ["GBP", 1] },
	condition: "transaction.amount > 1",
}
const chargeFixedCurrencyDiff: pax2pay.Rule.Charge = {
	code: "charge-test",
	name: "charge test",
	type: "capture",
	category: "fincrime",
	flags: [],
	description: "Charge 1 SEK fee.",
	action: "charge",
	charge: { fixed: ["SEK", 1] },
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
		undefined,
		card,
		organization
	)
}
describe("definitions", () => {
	it("exceedsAmount", () => {
		expect(pax2pay.Rule.evaluate([rule1], getState("card", "initiate", "authorization")).outcomes).toEqual({
			charge: [],
			flag: [],
			reserve: [],
			score: [],
			reject: [rule1],
			review: [],
		})
	})
	it("more risk", () => {
		const evaluated = pax2pay.Rule.evaluate([score, riskCheck], getState("card", "initiate", "authorization"))
		expect(evaluated.outcome).toEqual("reject")
		expect(evaluated.transaction.risk).toEqual(600)
	})
	it("double risk", () => {
		expect(
			pax2pay.Rule.evaluate([score, notScore, score, notScore], getState("card", "initiate", "authorization"))
				.transaction.risk
		).toEqual(3600)
	})
	it("less risk", () => {
		const evaluated = pax2pay.Rule.evaluate([score, riskFlag], getState("card", "initiate", "authorization"))
		expect(evaluated.transaction.risk).toEqual(600)
		expect(evaluated.outcome).toEqual("approve")
		expect(evaluated.outcomes.flag).toEqual([riskFlag])
	})
	it("one charge - percent", () => {
		const state = getState("card", "finalize", "capture")
		const evaluated = pax2pay.Rule.evaluate([chargePercent], state)
		const fee = isoly.Currency.multiply(
			state.transaction.original.currency,
			state.transaction.original.amount,
			(chargePercent.charge.percentage ?? 0) / 100
		)
		expect(evaluated.outcomes.charge).toEqual([
			{
				action: "charge",
				category: "fincrime",
				charge: { percentage: 1.5 },
				code: "charge-test",
				condition: "transaction.amount > 1",
				description: "Charge 1.5% fee.",
				flags: [],
				name: "charge test",
				type: "capture",
			},
		])
		expect(evaluated.transaction.original.charge?.total).toEqual(fee)
		expect(evaluated.transaction.original.total).toEqual(state.transaction.original.amount + fee)
	})
	it("two charges - percent", () => {
		const state = getState("card", "finalize", "capture")
		const evaluated = pax2pay.Rule.evaluate([chargePercent, chargePercent], state)
		const fee = isoly.Currency.multiply(
			state.transaction.original.currency,
			isoly.Currency.multiply(
				state.transaction.original.currency,
				state.transaction.original.amount,
				(chargePercent.charge.percentage ?? 0) / 100
			),
			2
		)
		expect(evaluated.transaction.original.charge?.total).toEqual(fee)
		expect(evaluated.transaction.original.total).toEqual(state.transaction.original.amount + fee)
	})
	it("one charge fixed - same currency", () => {
		const state = getState("card", "finalize", "capture")
		const evaluated = pax2pay.Rule.evaluate([chargeFixed], state, undefined, table)
		const fixedChargeAmount = chargeFixed.charge.fixed?.[1] ?? 0
		expect(evaluated.transaction.original.charge?.total).toEqual(fixedChargeAmount)
		expect(evaluated.transaction.original.total).toEqual(state.transaction.original.amount + fixedChargeAmount)
	})
	it("one charge fixed - different currency", () => {
		const state = getState("card", "finalize", "capture")
		const evaluated = pax2pay.Rule.evaluate([chargeFixedCurrencyDiff], state, undefined, table)
		const fixedChargeAmount = chargeFixedCurrencyDiff.charge.fixed
			? Exchange.convert(
					chargeFixedCurrencyDiff.charge.fixed[1],
					chargeFixedCurrencyDiff.charge.fixed[0],
					state.transaction.currency,
					table
			  ) ?? 0
			: 0
		expect(evaluated.transaction.original.charge?.total).toEqual(fixedChargeAmount)
		expect(evaluated.transaction.original.total).toEqual(state.transaction.original.amount + fixedChargeAmount)
	})
	it("two charge fixed, percent - different currency", () => {
		const state = getState("card", "finalize", "capture")
		const evaluated = pax2pay.Rule.evaluate([chargePercent, chargeFixedCurrencyDiff], state, undefined, table)
		const percentCharge = isoly.Currency.multiply(
			state.transaction.original.currency,
			state.transaction.original.amount,
			(chargePercent.charge.percentage ?? 0) / 100
		)
		const fixedChargeAmount = chargeFixedCurrencyDiff.charge.fixed
			? Exchange.convert(
					chargeFixedCurrencyDiff.charge.fixed[1],
					chargeFixedCurrencyDiff.charge.fixed[0],
					state.transaction.currency,
					table
			  ) ?? 0
			: 0
		const total = isoly.Currency.add(
			state.transaction.currency,
			isoly.Currency.add(state.transaction.currency, state.transaction.original.amount, fixedChargeAmount),
			percentCharge
		)
		expect(evaluated.transaction.original.charge?.total).toEqual(fixedChargeAmount + percentCharge)
		expect(evaluated.transaction.original.total).toEqual(total)
	})
	it("one outbound reserve fixed", () => {
		const state = getState("external", "initiate", "outbound")
		const originalAmount = state.transaction.original.amount
		const evaluated = pax2pay.Rule.evaluate([outboundReserve], state, undefined, table)
		const fixedReserveAmount = outboundReserve.reserve.fixed ? outboundReserve.reserve.fixed[1] : 0
		expect(evaluated.transaction.original.reserve).toEqual(fixedReserveAmount)
		expect(evaluated.transaction.original.total).toEqual(originalAmount + fixedReserveAmount)
	})
	it("one incoming charge fixed", () => {
		const state = getState("external", "finalize", "inbound")
		const originalAmount = state.transaction.original.amount
		const evaluated = pax2pay.Rule.evaluate([incomingCharge], state, undefined, table)
		const fixedChargeAmount = incomingCharge.charge.fixed ? incomingCharge.charge.fixed[1] : 0
		expect(evaluated.transaction.original.charge?.total).toEqual(fixedChargeAmount)
		expect(evaluated.transaction.original.total).toEqual(originalAmount - fixedChargeAmount)
	})
	it("isInternal", () => {
		expect(pax2pay.Rule.evaluate([rule2], getState("internal", "initiate", "outbound")).outcomes).toEqual({
			charge: [],
			review: [],
			score: [],
			reserve: [],
			reject: [],
			flag: [rule2],
		})
	})
	it("always reject", () => {
		expect(pax2pay.Rule.evaluate([rule3], getState("card", "initiate", "authorization")).outcomes).toEqual({
			charge: [],
			review: [],
			score: [],
			reserve: [],
			reject: [rule3],
			flag: [],
		})
	})
	it("optional authorization", () => {
		expect(pax2pay.Rule.evaluate([rule4], getState("card", "initiate", "authorization")).outcomes).toEqual({
			charge: [],
			review: [],
			score: [],
			reserve: [],
			reject: [rule4],
			flag: [],
		})
	})
	it("many rules", () => {
		expect(
			pax2pay.Rule.evaluate([rule1, rule2, rule3, chargePercent], getState("card", "initiate", "authorization"))
				.outcomes
		).toEqual({
			charge: [],
			review: [],
			score: [],
			reserve: [],
			reject: [rule1, rule3],
			flag: [],
		})
	})
	it("group rule", () => {
		const ev = pax2pay.Rule.evaluate([groupRule], getState("card", "initiate", "authorization"))
		expect(ev.outcomes).toEqual({
			charge: [],
			review: [],
			score: [],
			reserve: [],
			reject: [groupRule],
			flag: [],
		})
	})
	it("preset rule", () => {
		const evaluated = pax2pay.Rule.evaluate([presetRule], getState("card", "initiate", "authorization"))
		expect(evaluated.outcomes).toEqual({
			charge: [],
			review: [],
			score: [],
			reserve: [],
			reject: [presetRule],
			flag: [],
		})
	})
})
const table = {
	GBP: {
		SEK: 13.2933445176,
	},
	SEK: {
		GBP: 0.0752256137,
	},
}
