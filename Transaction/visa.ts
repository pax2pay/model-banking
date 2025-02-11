import { isoly } from "isoly"
import { Transaction } from "./index"

export namespace visa {
	const regions: Record<"National" | "Intra-Regional" | "Inter-Regional" | "Non-EEA", isoly.CountryCode.Alpha2[]> = {
		National: ["GB"],
		"Intra-Regional": [
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
		"Inter-Regional": ["IS", "NO", "LI"],
		"Non-EEA": [],
	}
	const headers = [
		"Product Local Name",
		"Visa IDX - 45672555",
		"Visa IDX  - 4567255",
		"Visa IDX 1.4% - 45672557",
		"Total Visa IDX products",
		"Visa Business Prepaid - 44260108",
		"Visa Corporate Deferred Debit  - 49359119",
		"Visa Business Immediate Debit - BIN: 45672554",
	] as const
	const rows = [
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
		"Number of Cards - Magnetic Stripe Chip", // TODO: switch to "|" separator. Real value: "Number of Cards - Magnetic Stripe, Chip",
		"Number of Cards - Magnetic Stripe Contactless", // TODO: switch to "|" separator. Real value: "Number of Cards - Magnetic Stripe, Contactless",
		"Number of Cards - Magnetic Stripe Chip Contactless", // TODO: switch to "|" separator. Real value: "Number of Cards - Magnetic Stripe, Chip, Contactless",
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
		// "Country X - Region X Payments Card Present Count - Month x",
		// "Country X - Region X Payments Card Present Volume - Month x",
		// "Country X - Region X Payments Card Not Present Count - Month x",
		// "Country X - Region X Payments Card Not Present Volume - Month x",
	] as const
	const rowsNonZero = [
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
		// "Country X - Region X Payments Card Present Count - Month x",
		// "Country X - Region X Payments Card Present Volume - Month x",
		// "Country X - Region X Payments Card Not Present Count - Month x",
		// "Country X - Region X Payments Card Not Present Volume - Month x",
	] as const
	// const rowsReport2 /* visa didgeridoo */ = [
	// "Country X - Region X Payments Card Present Count - Month x",
	// "Country X - Region X Payments Card Present Volume - Month x",
	// "Country X - Region X Payments Card Not Present Count - Month x",
	// "Country X - Region X Payments Card Not Present Volume - Month x",
	// ] as const
	const rowsBlank = [
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
	type PerMonth = Record<1 | 2 | 3, { count: number; volume: number }>
	type PerIinEnum = Partial<
		Record<
			// | "National Payments Count - Month "
			// | "National Payments Volume - Month "
			// | "International - Intra-Regional Payments Count - Month "
			// | "International - Intra-Regional Payments Volume - Month "
			// | "International - Non-EEA Payments Count - Month "
			// | "International - Non-EEA Payments Volume - Month "
			// | "International - Inter-Regional Payments Count - Month "
			// | "International - Inter-Regional Payments Volume - Month "
			| "National Payments"
			| "International - Intra-Regional Payments"
			| "International - Non-EEA Payments"
			| "International - Inter-Regional Payments",
			PerMonth
		>
	>
	type NonMonthly = Record<
		| "Total Number of Cards"
		| "Total Number of Active Cards"
		| "Total Number of Accounts"
		| "Number of Accounts - International Enabled"
		| "Payments Transactions Declined for Insufficient Funds - Number",
		number
	>
	type PerIin = Partial<PerIinEnum & NonMonthly & Record<string, PerMonth>>
	export const idxIins = ["45672555", "4567255", "45672557"] as const
	export const visaIins = ["45672555", "4567255", "45672557", "44260108", "49359119", "45672554"] as const
	type VisaIin = typeof visaIins[number]
	export type Data = Partial<Record<VisaIin, PerIin>>

	export function getRegion(transaction: Transaction.CardTransaction): keyof typeof regions {
		let result: keyof typeof regions
		if (regions.National.includes(transaction.counterpart.merchant.country))
			result = "National"
		else if (regions["Intra-Regional"].includes(transaction.counterpart.merchant.country))
			result = "Intra-Regional"
		else if (regions["Inter-Regional"].includes(transaction.counterpart.merchant.country))
			result = "Inter-Regional"
		else
			result = "Non-EEA"
		return result
	}
	export function getMonth(transaction: Transaction.CardTransaction): 1 | 2 | 3 {
		return 1 // TODO: figure out month number
	}
	export function getKey(transaction: Transaction.CardTransaction): keyof PerIinEnum {
		let result: keyof PerIinEnum
		const region = getRegion(transaction)
		switch (region) {
			case "National":
				result = "National Payments"
				break
			case "Inter-Regional":
				result = "International - Inter-Regional Payments"
				break
			case "Intra-Regional":
				result = "International - Intra-Regional Payments"
				break
			case "Non-EEA":
				result = "International - Non-EEA Payments"
				break
		}
		return result
	}
	export function updatePerMonth(previous: PerMonth | undefined, transaction: Transaction.CardTransaction): PerMonth {
		const result: PerMonth = previous ?? {
			"1": { count: 0, volume: 0 },
			"2": { count: 0, volume: 0 },
			"3": { count: 0, volume: 0 },
		}
		if (transaction.direction == "outbound") {
			const month = getMonth(transaction)
			result[month].count++
			result[month].volume += Math.abs(transaction.amount.original)
		}
		return result
	}
	export function updateDataRow(data: PerIin, transaction: Transaction.CardTransaction): PerIin {
		const result: PerIin = data
		if (Array.isArray(transaction.status) && transaction.status[1] == "insufficient funds")
			data["Payments Transactions Declined for Insufficient Funds - Number"] =
				(data?.["Payments Transactions Declined for Insufficient Funds - Number"] ?? 0) + 1
		else if (transaction.status == "finalized") {
			const key: keyof PerIinEnum = getKey(transaction)
			data[key] = updatePerMonth(data[key], transaction)
			// TODO: add wacky country data
		}
		return result
	}

	export function create(transactions: Transaction.CardTransaction[]): Data {
		const result: Data = {}
		for (const transaction of transactions)
			result[transaction.account.iin as VisaIin] = updateDataRow(
				result[transaction.account.iin as VisaIin] ?? {},
				transaction
			)
		return result
	}
	export function dataToCsv(data: Data, row: typeof rowsNonZero[number]): string {
		let result: string
		if (row.endsWith("Month x")) {
			let key: keyof PerIinEnum
			if (row.startsWith("National"))
				key = "National Payments"
			else if (row.startsWith("International - Inter-Regional"))
				key = "International - Inter-Regional Payments"
			else if (row.startsWith("International - Intra-Regional"))
				key = "International - Intra-Regional Payments"
			else
				key = "International - Non-EEA Payments"
			const months = [1, 2, 3] as const
			const which: "count" | "volume" = row.includes("Count") ? "count" : "volume"
			result = ""
			for (const month of months) {
				result += `${row.replace("Month x", `Month ${month}`)},`
				const thingy = `${data["45672555"]?.[key]?.[month][which] ?? 0},`
				console.log("data: ", data["45672555"])

				result += thingy
				result += `${data["4567255"]?.[key]?.[month][which] ?? 0},`
				result += `${data["45672557"]?.[key]?.[month][which] ?? 0},`
				result += "999," // TODO: total idx
				result += `${data["44260108"]?.[key]?.[month][which] ?? 0},`
				result += `${data["49359119"]?.[key]?.[month][which] ?? 0},`
				result += `${data["45672554"]?.[key]?.[month][which] ?? 0}`
				result += "\n"
			}
		} else
			result = "\n"
		return result
	}
	export function toCsv(data: Data): string {
		let csv = headers.join(",") + "\n"
		for (const row of rows)
			if (rowsBlank.includes(row as any))
				csv += row + ",".repeat(headers.length - 1) + "\n"
			else if (rowsNonZero.includes(row as any))
				csv += dataToCsv(data, row as any)
			else if (row.endsWith("Month x"))
				for (let i = 1; 3 >= i; i++)
					csv += row.replace("Month x", `Month ${i}`) + ",0".repeat(headers.length - 1) + "\n"
			else
				csv += row + ",0".repeat(headers.length - 1) + "\n"

		return csv
	}
}
