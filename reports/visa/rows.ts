import { isly } from "isly"

export namespace rows {
	export const all = [
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
	] as const
	export type NonZero = typeof NonZero.values[number]
	export namespace NonZero {
		export const values = [
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
		] as const
		export const type = isly.string<NonZero>(values)
	}
	export type Blank = typeof Blank.values[number]
	export namespace Blank {
		export const values = [
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
		] as const
		export const type = isly.string<Blank>(values)
		export function toCsvRow(row: Blank, count: number): string {
			return row + "|".repeat(count) + "\n"
		}
	}
	export function monthlyZeroRows(row: string, zeroes: number): string {
		let result = ""
		for (let i = 1; 3 >= i; i++)
			result += row.replace("Month x", `Month ${i}`) + "|0".repeat(zeroes) + "\n"
		return result
	}
	export function zeros(row: string, zeroes: number): string {
		return row + "|0".repeat(zeroes) + "\n"
	}
}
