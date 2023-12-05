import { pax2pay } from "../index"

describe("Counterbalances", () => {
	it("Counterbalances.Counterbalance.Entry.Settlement RegExp", () => {
		expect(pax2pay.Counterbalances.Counterbalance.Entry.type.is("settle_uk-mc-tpl-marqeta_202312306")).toBeTruthy()
		expect(pax2pay.Counterbalances.Counterbalance.Entry.type.is("settle_uk-mc-tpl-marqeta_202312307")).toBeFalsy()
	})
	it("Counterbalances.Counterbalance.add", () => {
		const Counterbalance1: pax2pay.Counterbalances.Counterbalance = { fee_other: 123 }
		const Counterbalance2: pax2pay.Counterbalances.Counterbalance = { fee_other: 123, incoming_internal: 789 }
		expect(pax2pay.Counterbalances.Counterbalance.add(Counterbalance1, Counterbalance2, "USD")).toEqual({
			fee_other: 246,
			incoming_internal: 789,
		})
	})
	it("Counterbalances.add", () => {
		const Counterbalances1: pax2pay.Counterbalances = {
			USD: { fee_other: 123 },
			GBP: { "settle_uk-mc-tpl-marqeta_202312306": 999 },
			SEK: { "settle_uk-mc-tpl-marqeta_202312306": 999 },
		}
		const Counterbalances2: pax2pay.Counterbalances = { USD: { fee_other: 123, incoming_internal: 789 } }
		expect(pax2pay.Counterbalances.add(Counterbalances1, Counterbalances2)).toEqual({
			USD: {
				fee_other: 246,
				incoming_internal: 789,
			},
			GBP: {
				"settle_uk-mc-tpl-marqeta_202312306": 999,
			},
			SEK: {
				"settle_uk-mc-tpl-marqeta_202312306": 999,
			},
		})
	})
})
