import { pax2pay } from "../index"

const rule1: pax2pay.Organization.Rule = {
	name: "amount limit",
	type: "inbound",
	flags: [],
	description: "",
	action: "reject",
	condition: "exceedsAmount(500)",
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
describe("definitions", () => {
	it("exceedsAmount", () => {
		expect(pax2pay.Rule.evaluate([rule1], transaction1)).toEqual({ review: [], reject: [rule1], flag: [] })
	})
	it("isInternal", () => {
		expect(pax2pay.Rule.evaluate([rule2], transaction1)).toEqual({ review: [], reject: [], flag: [rule2] })
	})
	it("always reject", () => {
		expect(pax2pay.Rule.evaluate([rule3], transaction3)).toEqual({ review: [], reject: [rule3], flag: [] })
	})
	it("many rules", () => {
		expect(pax2pay.Rule.evaluate([rule1, rule2, rule3], transaction1)).toEqual({
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