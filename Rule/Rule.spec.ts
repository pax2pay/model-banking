import { pax2pay } from "../index"

describe("Rules", () => {
	it("is", () => {
		expect(rules.reduce<boolean>((p, c) => p && pax2pay.Rule.type.is(c), true)).toEqual(true)
	})
})

const rules: pax2pay.Rule[] = [
	{
		name: "Sanctioned Countries and Territories",
		description: "Reject transactions to merchants in sanctioned countries.",
		action: "reject",
		type: "authorization",
		condition: "authorization.merchant.country:within(data.countries.sanctioned)",
		flags: ["sanctioned", "country"],
	},
	{
		name: "Single Use",
		description: "Reject authorization if card already has performed an authorization.",
		action: "flag",
		type: "authorization",
		condition: "card.used.count>0",
		flags: ["strict single use"],
	},
	{
		name: "Single Use",
		description:
			"Reject authorization if card has previously been used to authorize more than 2 GBP in total. Allows for probing auths.",
		action: "score",
		risk: 5000,
		type: "authorization",
		condition: "card.used.amount>2 | card.used.count>1",
		flags: ["single use"],
	},
]
