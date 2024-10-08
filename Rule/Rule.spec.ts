import { pax2pay } from "../index"

describe("Rules", () => {
	it("is", () => {
		expect(rules.reduce<boolean>((p, c) => p && pax2pay.Rule.type.is(c), true)).toEqual(true)
	})
	it("risk is", () => {
		expect(pax2pay.Rule.Score.Risk.is(5)).toEqual(true)
		expect(pax2pay.Rule.Score.Risk.is(-5)).toEqual(false)
		expect(pax2pay.Rule.Score.Risk.is(5.5)).toEqual(false)
	})
})

const rules: pax2pay.Rule[] = [
	{
		code: "abc",
		name: "Sanctioned Countries and Territories",
		description: "Reject transactions to merchants in sanctioned countries.",
		action: "reject",
		category: "fincrime",
		type: "authorization",
		condition: "authorization.merchant.country:within(data.countries.sanctioned)",
		flags: ["sanctioned", "country"],
	},
	{
		code: "abc",
		name: "Single Use",
		description: "Reject authorization if card already has performed an authorization.",
		action: "flag",
		type: "authorization",
		category: "product",
		condition: "card.used.count>0",
		flags: ["strict single use"],
	},
	{
		code: "abc",
		name: "Single Use",
		description:
			"Reject authorization if card has previously been used to authorize more than 2 GBP in total. Allows for probing auths.",
		action: "score",
		risk: 5000,
		type: "authorization",
		category: "fincrime",
		condition: "card.used.amount>2 | card.used.count>1",
		flags: ["single use"],
	},
]
