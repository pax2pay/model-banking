import { pax2pay } from "../index"

// cSpell:disable
describe("Transaction", () => {
	// 	it("toCsv", () => {
	// 		expect(pax2pay.Transaction.toCsv([transaction])).toMatchInlineSnapshot(`
	// ""id","created","changed","organization.code","account.id","rail.id","rail.address","counterpart.id","counterpart.address","amount","currency","status","flags.current","flags.past","reason","merchant.country"
	// "zzzyRwIvXovdzVNA","2023-12-05 17:26:36.977","","paxair","3Lb41MlP","internal-3Lb41MlP","internal-3Lb41MlP","internal-IkToJ5Ep","internal-IkToJ5Ep","-10.00","GBP","review","dannebrogen union-jack","sssr","","""
	// `)
	// 	})
	it("istransaction", () => {
		console.log(pax2pay.Transaction.CardTransaction.type.is(transactions[0]))
		// const tr = transactions.filter(transaction => pax2pay.Transaction.CardTransaction.type.is(transaction))
		// console.log(pax2pay.reports.visa.Data.create(tr))
		expect(pax2pay.Transaction.CardTransaction.type.is(transactions[0])).toBeTruthy()
	})
})
// const transaction: pax2pay.Transaction = {
// 	amount: { original: -10, charge: 0, total: -10 },
// 	counterpart: { type: "internal", identifier: "IkToJ5Ep" },
// 	currency: "GBP",
// 	description: "Collect fee_test-paxgiro_202333303.",
// 	organization: "paxair",
// 	accountId: "3Lb41MlP",
// 	account: { type: "internal", identifier: "3Lb41MlP" },
// 	id: "zzzyRwIvXovdzVNA",
// 	type: "internal",
// 	direction: "outbound",
// 	posted: "2023-12-05T17:26:36.977Z",
// 	balance: { actual: 420, reserved: 420, available: 420 },
// 	operations: [
// 		{
// 			account: "3Lb41MlP",
// 			currency: "GBP",
// 			type: "collect",
// 			changes: { "fee_test-paxgiro_202333303": { type: "subtract", amount: 10, status: "success", result: 0 } },
// 			transaction: "zzzyRwIvXovdzVNA",
// 			counter: 0,
// 			created: "2023-12-05T17:26:36.977Z",
// 		},
// 	],
// 	status: "review",
// 	rail: "paxgiro",
// 	flags: ["dannebrogen", "union-jack"],
// 	oldFlags: ["sssr"],
// 	notes: [],
// }

const transactions: pax2pay.Transaction[] = [
	{
		id: "zzzyPHlg70jFq9j9",
		counterpart: {
			type: "card",
			acquirer: {
				id: "446365",
				number: "513510269160",
				country: "GB",
				systemTraceAuditNumber: "269160",
				retrievalReferenceNumber: "513510269160",
			},
			merchant: {
				id: "2100372496",
				zip: "",
				city: "LONDON",
				name: "RYANAIR",
				address: "",
				country: "GB",
				category: "3246",
			},
		},
		currency: "GBP",
		organization: "dnatatravel",
		accountId: "Y8R5zVTA",
		account: {
			id: "zzzyPHlgFAzug96R",
			iin: "45672557",
			type: "card",
			last4: "5018",
			expiry: [25, 6],
			holder: " Dnata Travel Holdings ",
			scheme: "visa",
		},
		type: "card",
		posted: "2025-05-15T10:53:25.873Z",
		balance: {
			actual: 76367.98,
			reserved: 19463.92,
			available: 56904.06,
		},
		status: "processing",
		rail: "visa",
		flags: [],
		notes: [],
		amount: {
			total: -393.82,
			charge: 0,
			original: -393.82,
		},
		charge: 0,
		oldFlags: [],
		direction: "outbound",
		reference: {
			reference: "baef1219-70b8-4fa1-9c5e-15c8ca1925d3",
		},
		accountName: "Primary Account",
		description: "authorization RYANAIR",
	},
	{
		id: "zzzyPHSJq3InnuGj",
		counterpart: {
			type: "card",
			acquirer: {
				id: "446365",
				number: "513610202879",
				country: "GB",
				systemTraceAuditNumber: "202879",
				retrievalReferenceNumber: "513610202879",
			},
			merchant: {
				id: "2100372496",
				zip: "",
				city: "LONDON",
				name: "RYANAIR",
				address: "",
				country: "GB",
				category: "3246",
			},
		},
		currency: "GBP",
		organization: "dnatatravel",
		accountId: "Y8R5zVTA",
		account: {
			id: "zzzyPHSK-AMvz-Ee",
			iin: "45672557",
			type: "card",
			last4: "8558",
			expiry: [25, 6],
			holder: " Dnata Travel Holdings ",
			scheme: "visa",
		},
		type: "card",
		posted: "2025-05-16T10:36:57.669Z",
		balance: {
			actual: 60882.47,
			reserved: 20095.63,
			available: 40786.84,
		},
		status: "processing",
		rail: "visa",
		flags: [],
		notes: [],
		amount: {
			total: -162.98,
			charge: 0,
			original: -162.98,
		},
		charge: 0,
		oldFlags: [],
		direction: "outbound",
		reference: {
			reference: "ad636594-8a89-404e-a123-4678ae2a7d38",
		},
		accountName: "Primary Account",
		description: "authorization RYANAIR",
	},
]
