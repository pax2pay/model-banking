import { isoly } from "isoly"

export namespace visa {
	const regions: Record<"national" | "intra-region" | "inter-region" | "other", isoly.CountryCode.Alpha2[]> = {
		national: ["GB"],
		"intra-region": [
			"AT",
			"BE",
			"BG",
			"HR",
			"CY",
			"CZ",
			"DK",
			"EE",
			"FI",
			"FR",
			"DE",
			"GR",
			"HU",
			"IE",
			"IT",
			"LV",
			"LT",
			"LU",
			"MT",
			"NL",
			"PL",
			"PT",
			"RO",
			"SK",
			"SI",
			"ES",
			"SE",
		],
		"inter-region": ["IS", "NO", "LI"],
		other: [],
	}
	const headers: string[] = [
		"Product Local Name",
		"Visa IDX - 45672555",
		"Visa IDX  - 4567255",
		"Visa IDX 1.4% - 45672557",
		"Total Visa IDX products",
		"Visa Business Prepaid - 44260108",
		"Visa Corporate Deferred Debit  - 49359119",
		"Visa Business Immediate Debit - BIN: 45672554",
	]
	const rows: string[] = [
		"On-Us Payments Count - Month x",
		"On-Us Payments Volume - Month x",
		"On-Us Account Funding Transaction Count - Month x",
		"On-Us Account Funding Transaction Volume - Month x",
		"On-Us Original Credits Count - Month x",
		"On-Us Original Credits Volume - Month x",
		"On-Us ATM Cash Advances Count - Month x",
		"On-Us ATM Cash Advances Volume - Month x",
		"On-Us Manual Cash Count - Month x",
		"On-Us Manual Cash Volume - Month x",
		"On-Us Cashback Count - Month x",
		"On-Us Cashback Volume - Month x",
		"National Payments Count - Month x",
		"National Payments Volume - Month x",
		"National Account Funding Transaction Count - Month x",
		"National Account Funding Transaction Volume - Month x",
		"National Original Credits Count - Month x",
		"National Original Credits Volume - Month x",
		"National ATM Cash Advances Count - Month x",
		"National ATM Cash Advances Volume - Month x",
		"National Manual Cash Count - Month x",
		"National Manual Cash Volume - Month x",
		"National Cashback Count - Month x",
		"National Cashback Volume - Month x",
		"International - Intra-Regional Payments Count - Month x",
		"International - Intra-Regional Payments Volume - Month x",
		"International - Intra-Regional Account Funding Transaction Count - Month x",
		"International - Intra-Regional Account Funding Transaction Volume - Month x",
		"International - Intra-Regional Original Credits Count - Month x",
		"International - Intra-Regional Original Credits Volume - Month x",
		"International - Intra-Regional ATM Cash Advances Count - Month x",
		"International - Intra-Regional ATM Cash Advances Volume - Month x",
		"International - Intra-Regional Manual Cash Count - Month x",
		"International - Intra-Regional Manual Cash Volume - Month x",
		"International - Intra-Regional Cashback Count - Month x",
		"International - Intra-Regional Cashback Volume - Month x",
		"International - Non-EEA Payments Count - Month x",
		"International - Non-EEA Payments Volume - Month x",
		"International - Non-EEA Account Funding Transaction Count - Month x",
		"International - Non-EEA Account Funding Transaction Volume - Month x",
		"International - Non-EEA Original Credits Count - Month x",
		"International - Non-EEA Original Credits Volume - Month x",
		"International - Non-EEA ATM Cash Advances Count - Month x",
		"International - Non-EEA ATM Cash Advances Volume - Month x",
		"International - Non-EEA Manual Cash Count - Month x",
		"International - Non-EEA Manual Cash Volume - Month x",
		"International - Non-EEA Cashback Count - Month x",
		"International - Non-EEA Cashback Volume - Month x",
		"International - Inter-Regional Payments Count - Month x",
		"International - Inter-Regional Payments Volume - Month x",
		"International - Inter-Regional Account Funding Transaction Count - Month x",
		"International - Inter-Regional Account Funding Transaction Volume - Month x",
		"International - Inter-Regional Original Credits Count - Month x",
		"International - Inter-Regional Original Credits Volume - Month x",
		"International - Inter-Regional ATM Cash Advances Count - Month x",
		"International - Inter-Regional ATM Cash Advances Volume - Month x",
		"International - Inter-Regional Manual Cash Count - Month x",
		"International - Inter-Regional Manual Cash Volume - Month x",
		"International - Inter-Regional Cashback Count - Month x",
		"International - Inter-Regional Cashback Volume - Month x",
		"Total Number of Cards",
		"Number of Cards - Magnetic Stripe",
		"Number of Cards - Magnetic Stripe, Chip",
		"Number of Cards - Magnetic Stripe, Contactless",
		"Number of Cards - Magnetic Stripe, Chip, Contactless",
		"Total Number of Active Cards",
		"Number of Active Cards - used at Contactless device",
		"Number of Devices with Visa Contactless - Micro Tags",
		"Number of Devices with Visa Contactless - Mobile Phones",
		"Number of Devices with Visa Contactless - Other Devices",
		"Total Number of Accounts",
		"Number of Accounts - Domestic Use Only",
		"Number of Accounts - International Enabled",
		"Total Number of Active Accounts",
		"Total Number of Personal Deposit Accounts",
		"Number of Savings Accounts",
		"Number of Regular Checking Accounts",
		"Fraud Recoveries - Domestic - Cash Disbursements - Amount",
		"Fraud Recoveries - Domestic - Payments - Amount",
		"Fraud Recoveries - International - Cash Disbursements - Amount",
		"Fraud Recoveries - International - Payments - Amount",
		"Gross Fraud Losses - Number of Accounts",
		"Gross Fraud Losses - Number of Recovered Accounts",
		"Gross Fraud Losses - Domestic - Cash Disbursements - Count",
		"Gross Fraud Losses - Domestic - Cash Disbursements - Volume",
		"Gross Fraud Losses - Domestic - Payments - Count",
		"Gross Fraud Losses - Domestic - Payments - Volume",
		"Gross Fraud Losses - International - Cash Disbursements - Count",
		"Gross Fraud Losses - International - Cash Disbursements - Volume",
		"Gross Fraud Losses - International - Payments - Count",
		"Gross Fraud Losses - International - Payments - Volume",
		"Total Product Balance - Volume",
		"Payments Transactions Declined for Insufficient Funds - Number",
		"Cash Transactions Declined for Insufficient Funds - Number",
		"Country X - Region X Payments Card Present Count - Month x",
		"Country X - Region X Payments Card Present Volume - Month x",
		"Country X - Region X Payments Card Not Present Count - Month x",
		"Country X - Region X Payments Card Not Present Volume - Month x",
	]
	const rowsNonZero: string[] = [
		"National Payments Count - Month x",
		"National Payments Volume - Month x",
		"International - Intra-Regional Payments Count - Month x",
		"International - Intra-Regional Payments Volume - Month x",
		"International - Non-EEA Payments Count - Month x",
		"International - Non-EEA Payments Volume - Month x",
		"International - Inter-Regional Payments Count - Month x",
		"International - Inter-Regional Payments Volume - Month x",
		"Total Number of Cards",
		"Total Number of Active Cards",
		"Total Number of Accounts",
		"Number of Accounts - International Enabled",
		"Payments Transactions Declined for Insufficient Funds - Number",
		"Country X - Region X Payments Card Present Count - Month x",
		"Country X - Region X Payments Card Present Volume - Month x",
		"Country X - Region X Payments Card Not Present Count - Month x",
		"Country X - Region X Payments Card Not Present Volume - Month x",
	]
	const rowsBlank: string[] = [
		"Fraud Recoveries - Domestic - Cash Disbursements - Amount",
		"Fraud Recoveries - Domestic - Payments - Amount",
		"Fraud Recoveries - International - Cash Disbursements - Amount",
		"Fraud Recoveries - International - Payments - Amount",
		"Gross Fraud Losses - Number of Accounts",
		"Gross Fraud Losses - Number of Recovered Accounts",
		"Gross Fraud Losses - Domestic - Cash Disbursements - Count",
		"Gross Fraud Losses - Domestic - Cash Disbursements - Volume",
		"Gross Fraud Losses - Domestic - Payments - Count",
		"Gross Fraud Losses - Domestic - Payments - Volume",
		"Gross Fraud Losses - International - Cash Disbursements - Count",
		"Gross Fraud Losses - International - Cash Disbursements - Volume",
		"Gross Fraud Losses - International - Payments - Count",
		"Gross Fraud Losses - International - Payments - Volume",
	]
	type PerIinEnum = Record<
		| "National Payments Count - Month 1"
		| "National Payments Count - Month 2"
		| "National Payments Count - Month 3"
		| "National Payments Volume - Month 1"
		| "National Payments Volume - Month 2"
		| "National Payments Volume - Month 3"
		| "International - Intra-Regional Payments Count - Month 1"
		| "International - Intra-Regional Payments Count - Month 2"
		| "International - Intra-Regional Payments Count - Month 3"
		| "International - Intra-Regional Payments Volume - Month 1"
		| "International - Intra-Regional Payments Volume - Month 2"
		| "International - Intra-Regional Payments Volume - Month 3"
		| "International - Non-EEA Payments Count - Month 1"
		| "International - Non-EEA Payments Count - Month 2"
		| "International - Non-EEA Payments Count - Month 3"
		| "International - Non-EEA Payments Volume - Month 1"
		| "International - Non-EEA Payments Volume - Month 2"
		| "International - Non-EEA Payments Volume - Month 3"
		| "International - Inter-Regional Payments Count - Month 1"
		| "International - Inter-Regional Payments Count - Month 2"
		| "International - Inter-Regional Payments Count - Month 3"
		| "International - Inter-Regional Payments Volume - Month 1"
		| "International - Inter-Regional Payments Volume - Month 2"
		| "International - Inter-Regional Payments Volume - Month 3"
		| "Total Number of Cards"
		| "Total Number of Active Cards"
		| "Total Number of Accounts"
		| "Number of Accounts - International Enabled"
		| "Payments Transactions Declined for Insufficient Funds - Number",
		number
	>

	type PerIin = PerIinEnum & Record<string, number>
	type VisaIin = "45672555" | "4567255" | "45672557" | "totalIdx" | "44260108" | "49359119" | "45672554"
	type Statistacs = Record<VisaIin, PerIin>

	// export function create(transactions: pax2pay.Transaction.CardTransaction[]) {
	// 	const result: Statistacs = {}
	// 	for (const transaction of transactions)
	// 		result[transaction.account.iin as VisaIin] = {}

	// 	return result
	// }
	export function statistacsToRow(statistics: Statistacs, iin: VisaIin): string {
		
	}
	export function toCsv(statistics: Statistacs): string {
		const a = statistics[44260108]
		let csv = headers.join(",") + "\n"
		for (const row of rows)
			if (rowsBlank.includes(row))
				csv += row + "\n"
			else if (rowsNonZero.includes(row)) {
				if (row.endsWith("x"))
					for (let i = 1; 3 >= i; i++)
						csv += statistics row.replace("Month x", `Month ${i}`) + ",0".repeat(headers.length - 1) + "\n"

				csv += "\n"
			} else if (row.endsWith("x"))
				for (let i = 1; 3 >= i; i++)
					csv += row.replace("Month x", `Month ${i}`) + ",0".repeat(headers.length - 1) + "\n"
			else
				csv += row + ",0".repeat(headers.length - 1) + "\n"

		return csv
	}
}
