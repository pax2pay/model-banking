import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { pax2pay } from "../../index"

describe("Treasury.Snapshot.Credit", () => {
	it("Type checks", () => {
		const notCursors = {
			GBP: { cursor: "n2z2EsAi", amount: "hej" },
		}
		const cursors: pax2pay.Treasury.Snapshot.funding.Cursors = {
			GBP: { cursor: "n2z2EsAi", amount: 57 },
		}
		expect(pax2pay.Treasury.Snapshot.funding.Cursors.type.is(cursors)).toBe(true)
		expect(pax2pay.Treasury.Snapshot.funding.Cursors.type.is(notCursors)).toBe(false)
	})
	it("Adds amount", () => {
		const cursors: pax2pay.Treasury.Snapshot.funding.Cursors = {
			GBP: { cursor: "n2z2EsAi", amount: 57 },
		}
		settlements.forEach(settlement => pax2pay.Treasury.Snapshot.funding.Cursors.updateAmount(settlement, cursors))
		expect(cursors.GBP?.amount).toBe(120)
	})
	it("Finds oldest unsettled", () => {
		const cursors: pax2pay.Treasury.Snapshot.funding.Cursors = {
			GBP: { cursor: "n2z2EsAi", amount: 57 },
		}
		pax2pay.Treasury.Snapshot.funding.settle(fundings, cursors)
		expect(cursors.GBP?.amount).toBe(-11)
		expect(cursors.GBP?.cursor.split("|")[2]).toBe(fundings[5].id)
	})
	it("Warns if stale", () => {
		const staleBalance = {
			cursor: `GBP|${isoly.DateTime.invert("2000-01-01T00:00:00.001Z")}|${cryptly.Identifier.generate(8)}`,
			amount: -20,
		}
		const notStaleBalance = {
			cursor: `GBP|${isoly.DateTime.invert(isoly.DateTime.now())}|${cryptly.Identifier.generate(8)}`,
			amount: -20,
		}
		expect(pax2pay.Treasury.Snapshot.funding.isStale(staleBalance, 1, pax2pay.Holidays.dates["England"])).toBe(true)
		expect(pax2pay.Treasury.Snapshot.funding.isStale(notStaleBalance, 1, pax2pay.Holidays.dates["England"])).toBe(false)
	})
})
const fundings = [
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
const settlements = [
	{
		id: "",
		currency: "GBP",
		amount: 11,
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
		amount: 31,
		created: "",
	},
].map((t, i) => {
	t.created = isoly.DateTime.previousDay(isoly.DateTime.now(), i)
	t.id = cryptly.Identifier.generate(8)
	return t
}) as pax2pay.Treasury.Transaction[]
