import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { pax2pay } from "../../index"

describe("Treasury.Snapshot.Credit", () => {
	it("Type checks", () => {
		const notBalances = {
			GBP: { cursor: "n2z2EsAi", amount: "57" },
		}
		const balances: pax2pay.Treasury.Snapshot.Credit.Balances = {
			GBP: { cursor: "n2z2EsAi", amount: 57, timestamp: "2024-05-19T22:35:42.000Z" },
		}
		expect(pax2pay.Treasury.Snapshot.Credit.Balances.type.is(balances)).toBe(true)
		expect(pax2pay.Treasury.Snapshot.Credit.Balances.type.is(notBalances)).toBe(false)
	})
	it("Adds amount", () => {
		const amounts: pax2pay.Amounts = { GBP: 43 }
		const balances: pax2pay.Treasury.Snapshot.Credit.Balances = {
			GBP: { cursor: "n2z2EsAi", amount: 57, timestamp: "2024-05-19T22:35:42.000Z" },
		}
		pax2pay.Treasury.Snapshot.Credit.updateBalances(amounts, balances)
		expect(balances.GBP?.amount).toBe(100)
	})
	it("Finds oldest unsettled", () => {
		const balances: pax2pay.Treasury.Snapshot.Credit.Balances = {
			GBP: { cursor: "n2z2EsAi", amount: 57, timestamp: "2024-05-19T22:35:42.000Z" },
		}
		pax2pay.Treasury.Snapshot.Credit.settleBalances(transactions, balances)
		expect(balances.GBP?.amount).toBe(-11)
		expect(balances.GBP?.cursor).toBe(transactions[5].id)
	})
	it("Warns if stale", () => {
		const staleBalance = {
			cursor: cryptly.Identifier.generate(8),
			amount: -20,
			timestamp: "2024-05-19T22:35:42.000Z",
		}
		const notStaleBalance = { cursor: cryptly.Identifier.generate(8), amount: -20, timestamp: isoly.DateTime.now() }
		expect(pax2pay.Treasury.Snapshot.Credit.isStale(staleBalance, 1, pax2pay.Holidays.dates["England"])).toBe(true)
		expect(pax2pay.Treasury.Snapshot.Credit.isStale(notStaleBalance, 1, pax2pay.Holidays.dates["England"])).toBe(false)
	})
})
const transactions = [
	{
		id: "",
		currency: "GBP",
		amount: 1,
		created: "",
	},
	{
		id: "",
		currency: "GBP",
		amount: 2,
		created: "",
	},
	{
		id: "",
		currency: "GBP",
		amount: 3,
		created: "",
	},
	{
		id: "",
		currency: "GBP",
		amount: 5,
		created: "",
	},
	{
		id: "",
		currency: "GBP",
		amount: 8,
		created: "",
	},
	{
		id: "",
		currency: "GBP",
		amount: 13,
		created: "",
	},
	{
		id: "",
		currency: "GBP",
		amount: 21,
		created: "",
	},
	{
		id: "",
		currency: "GBP",
		amount: 34,
		created: "",
	},
].map((t, i) => {
	t.created = isoly.DateTime.previousDay(isoly.DateTime.now(), i)
	t.id = cryptly.Identifier.generate(8)
	return t
}) as pax2pay.Treasury.Transaction[]
