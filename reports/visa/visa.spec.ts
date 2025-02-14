import { pax2pay } from "../../index"

describe("VisaComponent", () => {
	const transaction: pax2pay.Transaction.CardTransaction = {
		amount: { original: -1148.77, reserved: 0, charge: 0, total: -1148.77 },
		currency: "GBP",
		description: "authorization duck airline",
		counterpart: {
			type: "card",
			merchant: {
				name: "duck airline",
				id: "673538492",
				category: "4511",
				address: "",
				city: "FRANKFURT",
				zip: ".",
				state: "DEU",
				country: "DE",
			},
			acquirer: {
				country: "TR",
				id: "009541",
				number: "504107970650",
				retrievalReferenceNumber: "504107970650",
				systemTraceAuditNumber: "970650",
			},
		},
		type: "card",
		direction: "outbound",
		organization: "paxair",
		accountId: "TTbb8DCY",
		accountName: "Account 1",
		account: {
			type: "card",
			id: "zzzyPktnP22sx6Ys",
			expiry: [25, 3],
			holder: "pax pax",
			iin: "45672555",
			last4: "0488",
			scheme: "mastercard",
		},
		id: "zzzyPktn6u2PVcaz",
		posted: "2025-02-10T20:28:49.133Z",
		balance: { actual: 2277.15, reserved: 0, available: 2277.15 },
		status: "finalized",
		rail: "mastercard",
		flags: [],
		oldFlags: [],
		notes: [],
		charge: 0,
		transacted: "2025-02-11T10:44:24.384Z",
	}
	const data: pax2pay.reports.visa.Data = pax2pay.reports.visa.Data.create([transaction])
	it("should make visa report data", () => {
		const result: pax2pay.reports.visa.Data = {
			nonMonthly: {
				"Number of Accounts - International Enabled": {},
				"Payments Transactions Declined for Insufficient Funds - Number": {},
				"Total Number of Accounts": {},
				"Total Number of Active Cards": {},
				"Total Number of Cards": {},
			},
			country: {
				DE: {
					notPresent: {
						1: { count: {}, volume: {} },
						2: { count: { "45672555": 1, totalIdx: 1 }, volume: { "45672555": 1148.77, totalIdx: 1148.77 } },
						3: { count: {}, volume: {} },
					},
				},
			},
			regional: {
				"International - Intra-Regional Payments": {
					1: { count: {}, volume: {} },
					2: { count: { "45672555": 1, totalIdx: 1 }, volume: { "45672555": 1148.77, totalIdx: 1148.77 } },
					3: { count: {}, volume: {} },
				},
			},
		}
		expect(data).toMatchObject(result)
	})
	it("should make visa csv", () => {
		expect(pax2pay.reports.visa.toCsv(data)).toMatchInlineSnapshot(`
"Product Local Name|Visa IDX - 45672555|Visa IDX  - 4567255|Visa IDX 1.4% - 45672557|Total Visa IDX products|Visa Business Prepaid - 44260108|Visa Corporate Deferred Debit  - 49359119|Visa Business Immediate Debit - BIN: 45672554
On-Us Payments Count - Month 1|0|0|0|0|0|0|0
On-Us Payments Count - Month 2|0|0|0|0|0|0|0
On-Us Payments Count - Month 3|0|0|0|0|0|0|0
On-Us Payments Volume - Month 1|0|0|0|0|0|0|0
On-Us Payments Volume - Month 2|0|0|0|0|0|0|0
On-Us Payments Volume - Month 3|0|0|0|0|0|0|0
On-Us Account Funding Transaction Count - Month 1|0|0|0|0|0|0|0
On-Us Account Funding Transaction Count - Month 2|0|0|0|0|0|0|0
On-Us Account Funding Transaction Count - Month 3|0|0|0|0|0|0|0
On-Us Account Funding Transaction Volume - Month 1|0|0|0|0|0|0|0
On-Us Account Funding Transaction Volume - Month 2|0|0|0|0|0|0|0
On-Us Account Funding Transaction Volume - Month 3|0|0|0|0|0|0|0
On-Us Original Credits Count - Month 1|0|0|0|0|0|0|0
On-Us Original Credits Count - Month 2|0|0|0|0|0|0|0
On-Us Original Credits Count - Month 3|0|0|0|0|0|0|0
On-Us Original Credits Volume - Month 1|0|0|0|0|0|0|0
On-Us Original Credits Volume - Month 2|0|0|0|0|0|0|0
On-Us Original Credits Volume - Month 3|0|0|0|0|0|0|0
On-Us ATM Cash Advances Count - Month 1|0|0|0|0|0|0|0
On-Us ATM Cash Advances Count - Month 2|0|0|0|0|0|0|0
On-Us ATM Cash Advances Count - Month 3|0|0|0|0|0|0|0
On-Us ATM Cash Advances Volume - Month 1|0|0|0|0|0|0|0
On-Us ATM Cash Advances Volume - Month 2|0|0|0|0|0|0|0
On-Us ATM Cash Advances Volume - Month 3|0|0|0|0|0|0|0
On-Us Manual Cash Count - Month 1|0|0|0|0|0|0|0
On-Us Manual Cash Count - Month 2|0|0|0|0|0|0|0
On-Us Manual Cash Count - Month 3|0|0|0|0|0|0|0
On-Us Manual Cash Volume - Month 1|0|0|0|0|0|0|0
On-Us Manual Cash Volume - Month 2|0|0|0|0|0|0|0
On-Us Manual Cash Volume - Month 3|0|0|0|0|0|0|0
On-Us Cashback Count - Month 1|0|0|0|0|0|0|0
On-Us Cashback Count - Month 2|0|0|0|0|0|0|0
On-Us Cashback Count - Month 3|0|0|0|0|0|0|0
On-Us Cashback Volume - Month 1|0|0|0|0|0|0|0
On-Us Cashback Volume - Month 2|0|0|0|0|0|0|0
On-Us Cashback Volume - Month 3|0|0|0|0|0|0|0
National Payments Count - Month 1|0|0|0|0|0|0|0
National Payments Count - Month 2|0|0|0|0|0|0|0
National Payments Count - Month 3|0|0|0|0|0|0|0
National Payments Volume - Month 1|0|0|0|0|0|0|0
National Payments Volume - Month 2|0|0|0|0|0|0|0
National Payments Volume - Month 3|0|0|0|0|0|0|0
National Account Funding Transaction Count - Month 1|0|0|0|0|0|0|0
National Account Funding Transaction Count - Month 2|0|0|0|0|0|0|0
National Account Funding Transaction Count - Month 3|0|0|0|0|0|0|0
National Account Funding Transaction Volume - Month 1|0|0|0|0|0|0|0
National Account Funding Transaction Volume - Month 2|0|0|0|0|0|0|0
National Account Funding Transaction Volume - Month 3|0|0|0|0|0|0|0
National Original Credits Count - Month 1|0|0|0|0|0|0|0
National Original Credits Count - Month 2|0|0|0|0|0|0|0
National Original Credits Count - Month 3|0|0|0|0|0|0|0
National Original Credits Volume - Month 1|0|0|0|0|0|0|0
National Original Credits Volume - Month 2|0|0|0|0|0|0|0
National Original Credits Volume - Month 3|0|0|0|0|0|0|0
National ATM Cash Advances Count - Month 1|0|0|0|0|0|0|0
National ATM Cash Advances Count - Month 2|0|0|0|0|0|0|0
National ATM Cash Advances Count - Month 3|0|0|0|0|0|0|0
National ATM Cash Advances Volume - Month 1|0|0|0|0|0|0|0
National ATM Cash Advances Volume - Month 2|0|0|0|0|0|0|0
National ATM Cash Advances Volume - Month 3|0|0|0|0|0|0|0
National Manual Cash Count - Month 1|0|0|0|0|0|0|0
National Manual Cash Count - Month 2|0|0|0|0|0|0|0
National Manual Cash Count - Month 3|0|0|0|0|0|0|0
National Manual Cash Volume - Month 1|0|0|0|0|0|0|0
National Manual Cash Volume - Month 2|0|0|0|0|0|0|0
National Manual Cash Volume - Month 3|0|0|0|0|0|0|0
National Cashback Count - Month 1|0|0|0|0|0|0|0
National Cashback Count - Month 2|0|0|0|0|0|0|0
National Cashback Count - Month 3|0|0|0|0|0|0|0
National Cashback Volume - Month 1|0|0|0|0|0|0|0
National Cashback Volume - Month 2|0|0|0|0|0|0|0
National Cashback Volume - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Payments Count - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Payments Count - Month 2|1|0|0|1|0|0|0
International - Intra-Regional Payments Count - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Payments Volume - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Payments Volume - Month 2|1148.77|0|0|1148.77|0|0|0
International - Intra-Regional Payments Volume - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Account Funding Transaction Count - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Account Funding Transaction Count - Month 2|0|0|0|0|0|0|0
International - Intra-Regional Account Funding Transaction Count - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Account Funding Transaction Volume - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Account Funding Transaction Volume - Month 2|0|0|0|0|0|0|0
International - Intra-Regional Account Funding Transaction Volume - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Original Credits Count - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Original Credits Count - Month 2|0|0|0|0|0|0|0
International - Intra-Regional Original Credits Count - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Original Credits Volume - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Original Credits Volume - Month 2|0|0|0|0|0|0|0
International - Intra-Regional Original Credits Volume - Month 3|0|0|0|0|0|0|0
International - Intra-Regional ATM Cash Advances Count - Month 1|0|0|0|0|0|0|0
International - Intra-Regional ATM Cash Advances Count - Month 2|0|0|0|0|0|0|0
International - Intra-Regional ATM Cash Advances Count - Month 3|0|0|0|0|0|0|0
International - Intra-Regional ATM Cash Advances Volume - Month 1|0|0|0|0|0|0|0
International - Intra-Regional ATM Cash Advances Volume - Month 2|0|0|0|0|0|0|0
International - Intra-Regional ATM Cash Advances Volume - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Manual Cash Count - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Manual Cash Count - Month 2|0|0|0|0|0|0|0
International - Intra-Regional Manual Cash Count - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Manual Cash Volume - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Manual Cash Volume - Month 2|0|0|0|0|0|0|0
International - Intra-Regional Manual Cash Volume - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Cashback Count - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Cashback Count - Month 2|0|0|0|0|0|0|0
International - Intra-Regional Cashback Count - Month 3|0|0|0|0|0|0|0
International - Intra-Regional Cashback Volume - Month 1|0|0|0|0|0|0|0
International - Intra-Regional Cashback Volume - Month 2|0|0|0|0|0|0|0
International - Intra-Regional Cashback Volume - Month 3|0|0|0|0|0|0|0
International - Non-EEA Payments Count - Month 1|0|0|0|0|0|0|0
International - Non-EEA Payments Count - Month 2|0|0|0|0|0|0|0
International - Non-EEA Payments Count - Month 3|0|0|0|0|0|0|0
International - Non-EEA Payments Volume - Month 1|0|0|0|0|0|0|0
International - Non-EEA Payments Volume - Month 2|0|0|0|0|0|0|0
International - Non-EEA Payments Volume - Month 3|0|0|0|0|0|0|0
International - Non-EEA Account Funding Transaction Count - Month 1|0|0|0|0|0|0|0
International - Non-EEA Account Funding Transaction Count - Month 2|0|0|0|0|0|0|0
International - Non-EEA Account Funding Transaction Count - Month 3|0|0|0|0|0|0|0
International - Non-EEA Account Funding Transaction Volume - Month 1|0|0|0|0|0|0|0
International - Non-EEA Account Funding Transaction Volume - Month 2|0|0|0|0|0|0|0
International - Non-EEA Account Funding Transaction Volume - Month 3|0|0|0|0|0|0|0
International - Non-EEA Original Credits Count - Month 1|0|0|0|0|0|0|0
International - Non-EEA Original Credits Count - Month 2|0|0|0|0|0|0|0
International - Non-EEA Original Credits Count - Month 3|0|0|0|0|0|0|0
International - Non-EEA Original Credits Volume - Month 1|0|0|0|0|0|0|0
International - Non-EEA Original Credits Volume - Month 2|0|0|0|0|0|0|0
International - Non-EEA Original Credits Volume - Month 3|0|0|0|0|0|0|0
International - Non-EEA ATM Cash Advances Count - Month 1|0|0|0|0|0|0|0
International - Non-EEA ATM Cash Advances Count - Month 2|0|0|0|0|0|0|0
International - Non-EEA ATM Cash Advances Count - Month 3|0|0|0|0|0|0|0
International - Non-EEA ATM Cash Advances Volume - Month 1|0|0|0|0|0|0|0
International - Non-EEA ATM Cash Advances Volume - Month 2|0|0|0|0|0|0|0
International - Non-EEA ATM Cash Advances Volume - Month 3|0|0|0|0|0|0|0
International - Non-EEA Manual Cash Count - Month 1|0|0|0|0|0|0|0
International - Non-EEA Manual Cash Count - Month 2|0|0|0|0|0|0|0
International - Non-EEA Manual Cash Count - Month 3|0|0|0|0|0|0|0
International - Non-EEA Manual Cash Volume - Month 1|0|0|0|0|0|0|0
International - Non-EEA Manual Cash Volume - Month 2|0|0|0|0|0|0|0
International - Non-EEA Manual Cash Volume - Month 3|0|0|0|0|0|0|0
International - Non-EEA Cashback Count - Month 1|0|0|0|0|0|0|0
International - Non-EEA Cashback Count - Month 2|0|0|0|0|0|0|0
International - Non-EEA Cashback Count - Month 3|0|0|0|0|0|0|0
International - Non-EEA Cashback Volume - Month 1|0|0|0|0|0|0|0
International - Non-EEA Cashback Volume - Month 2|0|0|0|0|0|0|0
International - Non-EEA Cashback Volume - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Payments Count - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Payments Count - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Payments Count - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Payments Volume - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Payments Volume - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Payments Volume - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Account Funding Transaction Count - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Account Funding Transaction Count - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Account Funding Transaction Count - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Account Funding Transaction Volume - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Account Funding Transaction Volume - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Account Funding Transaction Volume - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Original Credits Count - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Original Credits Count - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Original Credits Count - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Original Credits Volume - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Original Credits Volume - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Original Credits Volume - Month 3|0|0|0|0|0|0|0
International - Inter-Regional ATM Cash Advances Count - Month 1|0|0|0|0|0|0|0
International - Inter-Regional ATM Cash Advances Count - Month 2|0|0|0|0|0|0|0
International - Inter-Regional ATM Cash Advances Count - Month 3|0|0|0|0|0|0|0
International - Inter-Regional ATM Cash Advances Volume - Month 1|0|0|0|0|0|0|0
International - Inter-Regional ATM Cash Advances Volume - Month 2|0|0|0|0|0|0|0
International - Inter-Regional ATM Cash Advances Volume - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Manual Cash Count - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Manual Cash Count - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Manual Cash Count - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Manual Cash Volume - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Manual Cash Volume - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Manual Cash Volume - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Cashback Count - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Cashback Count - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Cashback Count - Month 3|0|0|0|0|0|0|0
International - Inter-Regional Cashback Volume - Month 1|0|0|0|0|0|0|0
International - Inter-Regional Cashback Volume - Month 2|0|0|0|0|0|0|0
International - Inter-Regional Cashback Volume - Month 3|0|0|0|0|0|0|0
Total Number of Cards|0|0|0|0|0|0|0
Number of Cards - Magnetic Stripe|0|0|0|0|0|0|0
Number of Cards - Magnetic Stripe, Chip|0|0|0|0|0|0|0
Number of Cards - Magnetic Stripe, Contactless|0|0|0|0|0|0|0
Number of Cards - Magnetic Stripe, Chip, Contactless|0|0|0|0|0|0|0
Total Number of Active Cards|0|0|0|0|0|0|0
Number of Active Cards - used at Contactless device|0|0|0|0|0|0|0
Number of Devices with Visa Contactless - Micro Tags|0|0|0|0|0|0|0
Number of Devices with Visa Contactless - Mobile Phones|0|0|0|0|0|0|0
Number of Devices with Visa Contactless - Other Devices|0|0|0|0|0|0|0
Total Number of Accounts|0|0|0|0|0|0|0
Number of Accounts - Domestic Use Only|0|0|0|0|0|0|0
Number of Accounts - International Enabled|0|0|0|0|0|0|0
Total Number of Active Accounts|0|0|0|0|0|0|0
Total Number of Personal Deposit Accounts|0|0|0|0|0|0|0
Number of Savings Accounts|0|0|0|0|0|0|0
Number of Regular Checking Accounts|0|0|0|0|0|0|0
Fraud Recoveries - Domestic - Cash Disbursements - Amount|||||||
Fraud Recoveries - Domestic - Payments - Amount|||||||
Fraud Recoveries - International - Cash Disbursements - Amount|||||||
Fraud Recoveries - International - Payments - Amount|||||||
Gross Fraud Losses - Number of Accounts|||||||
Gross Fraud Losses - Number of Recovered Accounts|||||||
Gross Fraud Losses - Domestic - Cash Disbursements - Count|||||||
Gross Fraud Losses - Domestic - Cash Disbursements - Volume|||||||
Gross Fraud Losses - Domestic - Payments - Count|||||||
Gross Fraud Losses - Domestic - Payments - Volume|||||||
Gross Fraud Losses - International - Cash Disbursements - Count|||||||
Gross Fraud Losses - International - Cash Disbursements - Volume|||||||
Gross Fraud Losses - International - Payments - Count|||||||
Gross Fraud Losses - International - Payments - Volume|||||||
Total Product Balance - Volume|0|0|0|0|0|0|0
Payments Transactions Declined for Insufficient Funds - Number|0|0|0|0|0|0|0
Cash Transactions Declined for Insufficient Funds - Number|0|0|0|0|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Count Month 1|0|0|0|0|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Count Month 2|1|0|0|1|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Count Month 3|0|0|0|0|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Volume Month 1|0|0|0|0|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Volume Month 2|1148.77|0|0|1148.77|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Volume Month 3|0|0|0|0|0|0|0
"
`)
	})
})
