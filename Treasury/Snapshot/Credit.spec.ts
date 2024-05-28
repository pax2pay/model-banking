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
		expect(pax2pay.Treasury.Snapshot.Credit.isStale(staleBalance, 1, holidays)).toBe(true)
		expect(pax2pay.Treasury.Snapshot.Credit.isStale(notStaleBalance, 1, holidays)).toBe(false)
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
const holidays = [
	"2022-01-03",
	"2022-04-15",
	"2022-04-18",
	"2022-05-02",
	"2022-06-02",
	"2022-06-03",
	"2022-08-29",
	"2022-09-19",
	"2022-12-26",
	"2022-12-27",
	"2023-01-02",
	"2023-04-07",
	"2023-04-10",
	"2023-05-01",
	"2023-05-08",
	"2023-05-29",
	"2023-08-28",
	"2023-12-25",
	"2023-12-26",
	"2024-01-01",
	"2024-03-29",
	"2024-04-01",
	"2024-05-06",
	"2024-05-27",
	"2024-08-26",
	"2024-12-25",
	"2024-12-26",
	"2025-01-01",
	"2025-04-18",
	"2025-04-21",
	"2025-05-05",
	"2025-05-26",
	"2025-08-25",
	"2025-12-25",
	"2025-12-26",
	"2026-01-01",
	"2026-04-03",
	"2026-04-06",
	"2026-05-04",
	"2026-05-25",
	"2026-08-31",
	"2026-12-25",
	"2026-12-28",
]
