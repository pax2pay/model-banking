import { pax2pay } from "../../index"

describe("VisaComponent", () => {
	const transaction: pax2pay.Transaction.CardTransaction = {
		amount: { original: -1148.77, charge: 0, total: -1148.77 },
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
	const data: pax2pay.reports.visa.Data = pax2pay.reports.visa.Data.create([transaction], cards, {
		start: "2025-05-01",
		end: "2025-05-20",
	})
	it("should make visa report data", () => {
		const result: pax2pay.reports.visa.Data = {
			nonMonthly: {
				"Payments Transactions Declined for Insufficient Funds - Number": {},
				"Number of Accounts - International Enabled": { "45672557": 1, "45672555": 1, totalIdx: 2 },
				"Total Number of Accounts": { "45672557": 1, "45672555": 1, totalIdx: 2 },
				"Total Number of Active Cards": { "45672557": 2, totalIdx: 2 },
				"Total Number of Cards": { "45672555": 1, "45672557": 2, totalIdx: 3 },
				"Total Number of Active Accounts": { "45672557": 1, totalIdx: 1 },
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
		expect(data).toEqual(result)
	})
	it.skip("should merge data", () => {
		const result: pax2pay.reports.visa.Data = {
			nonMonthly: {
				"Payments Transactions Declined for Insufficient Funds - Number": {},
				"Number of Accounts - International Enabled": {},
				"Total Number of Accounts": {},
				"Total Number of Active Cards": {},
				"Total Number of Cards": {},
				"Total Number of Active Accounts": {},
			},
			country: {
				DE: {
					notPresent: {
						1: { count: {}, volume: {} },
						2: { count: { "45672555": 2, totalIdx: 2 }, volume: { "45672555": 2297.54, totalIdx: 2297.54 } },
						3: { count: {}, volume: {} },
					},
				},
			},
			regional: {
				"International - Intra-Regional Payments": {
					1: { count: {}, volume: {} },
					2: { count: { "45672555": 2, totalIdx: 2 }, volume: { "45672555": 2297.54, totalIdx: 2297.54 } },
					3: { count: {}, volume: {} },
				},
			},
		}
		expect(pax2pay.reports.visa.Data.merge(data, data)).toMatchObject(result)
	})
	it.skip("should make visa csv", () => {
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
Total Number of Cards|1|0|2|3|0|0|0
Number of Cards - Magnetic Stripe|0|0|0|0|0|0|0
Number of Cards - Magnetic Stripe, Chip|0|0|0|0|0|0|0
Number of Cards - Magnetic Stripe, Contactless|0|0|0|0|0|0|0
Number of Cards - Magnetic Stripe, Chip, Contactless|0|0|0|0|0|0|0
Total Number of Active Cards|0|0|2|2|0|0|0
Number of Active Cards - used at Contactless device|0|0|0|0|0|0|0
Number of Devices with Visa Contactless - Micro Tags|0|0|0|0|0|0|0
Number of Devices with Visa Contactless - Mobile Phones|0|0|0|0|0|0|0
Number of Devices with Visa Contactless - Other Devices|0|0|0|0|0|0|0
Total Number of Accounts|1|0|1|2|0|0|0
Number of Accounts - Domestic Use Only|0|0|0|0|0|0|0
Number of Accounts - International Enabled|1|0|1|2|0|0|0
Total Number of Active Accounts|0|0|1|1|0|0|0
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
Country DE - International - Intra-Regional Payments Card Not Present Count - Month 1|0|0|0|0|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Count - Month 2|1|0|0|1|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Count - Month 3|0|0|0|0|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Volume - Month 1|0|0|0|0|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Volume - Month 2|1148.77|0|0|1148.77|0|0|0
Country DE - International - Intra-Regional Payments Card Not Present Volume - Month 3|0|0|0|0|0|0|0
"
`)
	})
})

const cards: pax2pay.Card[] = [
	{
		id: "zzzyP",
		created: "2025-04-18T11:01:53.919Z",
		organization: "hej",
		realm: "test",
		account: "123",
		preset: "p2p-visa-idx-140",
		scheme: "visa",
		reference: "zzzyP",
		status: "cancelled",
		details: {
			iin: "45672557",
			last4: "1111",
			expiry: [25, 6],
			holder: "Hej",
		},
		history: [
			{
				type: "card",
				status: "cancelled",
				created: "2025-05-20T11:01:59.349Z",
			},
		],
		limit: ["GBP", 0],
		rules: [],
		spent: ["GBP", 414.15],
	},
	{
		id: "zzzyPG",
		created: "2025-05-19T10:45:19.568Z",
		organization: "hej",
		realm: "test",
		account: "123",
		preset: "p2p-visa-idx-140",
		scheme: "visa",
		reference: "zzzyPG",
		status: "cancelled",
		details: {
			iin: "45672557",
			last4: "1111",
			expiry: [25, 6],
			holder: "Hej",
		},
		history: [
			{
				type: "card",
				status: "cancelled",
				created: "2025-05-20T10:45:29.134Z",
			},
		],
		limit: ["GBP", 0],
		rules: [],
		spent: ["GBP", 477.74],
	},
	{
		id: "zzzyPGA",
		created: "2025-05-18T10:30:34.853Z",
		organization: "hej",
		realm: "test",
		account: "123",
		preset: "p2p-visa-idx-140",
		scheme: "visa",
		reference: "zzzyPGA",
		status: "cancelled",
		details: {
			iin: "45672557",
			last4: "1111",
			expiry: [25, 6],
			holder: "Hej",
		},
		history: [
			{
				type: "card",
				status: "cancelled",
				created: "2025-05-21T10:30:45.005Z",
			},
		],
		limit: ["GBP", 0],
		rules: [],
		spent: ["GBP", 421.98],
	},
	{
		id: "zzzyPGA0",
		created: "2025-05-19T10:30:34.853Z",
		organization: "hej",
		realm: "test",
		account: "456",
		preset: "p2p-visa-idx-140",
		scheme: "visa",
		reference: "zzzyPGA0",
		status: "cancelled",
		details: {
			iin: "45672555",
			last4: "1111",
			expiry: [25, 6],
			holder: "Hej",
		},
		history: [
			{
				type: "card",
				status: "cancelled",
				created: "2025-05-19T10:30:45.005Z",
			},
		],
		limit: ["GBP", 0],
		rules: [],
		spent: ["GBP", 421.98],
	},
]
