import { Card } from "../../../Card"
import { Transaction } from "../../index"
import { MCC } from "."

describe("MCC", () => {
	it.each([
		["in values", { values: ["5411"], ranges: [] }, "5411", true],
		["in range start", { values: [], ranges: [{ from: "5000", to: "5999" }] }, "5000", true],
		["in range middle", { values: [], ranges: [{ from: "5000", to: "5999" }] }, "5500", true],
		["in range end", { values: [], ranges: [{ from: "5000", to: "5999" }] }, "5999", true],
		[
			"in second range",
			{
				values: [],
				ranges: [
					{ from: "5000", to: "5999" },
					{ from: "7000", to: "7999" },
				],
			},
			"7500",
			true,
		],
		["not in values", { values: ["5411", "5422", "5433"], ranges: [] }, "5412", false],
		["out of range", { values: [], ranges: [{ from: "5000", to: "5999" }] }, "4999", false],
	])("MCC.Set.within - %s", (_: string, set: MCC.Set, category: string, isWithin: boolean) => {
		expect(MCC.Set.within(set, category)).toBe(isWithin)
	})
	it.each([
		["all stacks", ["*"] as MCC.Stack[], "p2p-diners-175" as Card.Preset, true],
		["stack no match", ["test-paxgiro", "uk-diners-dpg"] as MCC.Stack[], "p2p-visa-idx-200" as Card.Preset, false],
		["stack precise match", ["test-paxgiro", "uk-diners-dpg"] as MCC.Stack[], "p2p-diners-200" as Card.Preset, true],
	])("MCC.match stacks - %s", (_: string, stacks: MCC.Stack[], transactionPreset: Card.Preset, isMatch: boolean) => {
		const condition: MCC = {
			stacks,
			id: "test-condition",
			policy: "allow",
			description: "Test condition",
			set: { values: ["5411"], ranges: [] },
		}
		const transaction = {
			state: { card: { preset: transactionPreset } },
			counterpart: {
				type: "card",
				acquirer: { id: "acquirer", number: "acquirer" },
				merchant: {
					name: "FinalFlight",
					id: "final",
					category: "5411",
					address: "123 Main St",
					city: "Bristol",
					zip: "12345",
					country: "GB",
				},
			},
		} as Transaction
		expect(MCC.match(condition, transaction)).toBe(isMatch)
	})
})
