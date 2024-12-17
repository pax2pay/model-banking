import { pax2pay } from "../index"

// cSpell:disable
describe("Transaction", () => {
	it("toCsv", () => {
		expect(pax2pay.Transaction.toCsv([transaction])).toMatchInlineSnapshot(`
""id","created","changed","organization.code","account.id","rail.id","rail.address","counterpart.id","counterpart.address","amount","currency","status","flags.current","flags.past","reason","merchant.country"
"zzzyRwIvXovdzVNA","2023-12-05 17:26:36.977","","paxair","3Lb41MlP","internal-3Lb41MlP","internal-3Lb41MlP","internal-IkToJ5Ep","internal-IkToJ5Ep","-10.00","GBP","review","dannebrogen union-jack","sssr","","""
`)
	})
})
const transaction: pax2pay.Transaction = {
	amount: { original: -10, reserved: 0, charge: 0, total: -10 },
	counterpart: {
		type: "internal",
		identifier: "IkToJ5Ep",
	},
	currency: "GBP",
	description: "Collect fee_test-paxgiro_202333303.",
	organization: "paxair",
	accountId: "3Lb41MlP",
	account: {
		type: "internal",
		identifier: "3Lb41MlP",
	},
	id: "zzzyRwIvXovdzVNA",
	type: "internal",
	direction: "outbound",
	posted: "2023-12-05T17:26:36.977Z",
	balance: {
		actual: 420,
		reserved: 420,
		available: 420,
	},
	status: "review",
	rail: "paxgiro",
	flags: ["dannebrogen", "union-jack"],
	oldFlags: ["sssr"],
	notes: [],
}
