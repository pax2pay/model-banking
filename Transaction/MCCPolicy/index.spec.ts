import { Card } from "../../Card"
import { Transaction } from "../index"
import { MCCPolicy } from "./index"

describe("MCCPolicy", () => {
	it.each([
		["all stacks", undefined, "p2p-diners-175" as Card.Preset, true],
		["stack no match", ["test-paxgiro", "uk-diners-dpg"] as Card.Stack[], "p2p-visa-idx-200" as Card.Preset, false],
		["stack precise match", ["test-paxgiro", "uk-diners-dpg"] as Card.Stack[], "p2p-diners-200" as Card.Preset, true],
	])(
		"MCC.match stacks - %s",
		(_: string, stacks: Card.Stack[] | undefined, transactionPreset: Card.Preset, isMatch: boolean) => {
			const policy: MCCPolicy = {
				stacks,
				id: "test-condition",
				action: "allow",
				description: "Test condition",
				group: { values: ["5411"], ranges: [] },
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
			expect(MCCPolicy.match(policy, transaction)).toBe(isMatch)
		}
	)
	const allow: MCCPolicy = {
		id: "allow-5411",
		action: "allow",
		description: "Allow groceries",
		stacks: undefined,
		group: { values: ["5411"], ranges: [] },
	}
	const block: MCCPolicy = {
		id: "block-5500",
		action: "block",
		description: "Block fuel",
		stacks: undefined,
		group: { values: ["5500"], ranges: [] },
	}
	it.each([
		["no conditions", [], "5411", [], undefined],
		["no match", [allow, block], "7000", [], undefined],
		["allow match", [allow, block], "5411", [allow], true],
		["block match", [allow, block], "5500", [block], false],
		["block wins over allow", [{ ...allow, group: block.group }, block], "5500", [block], false],
	])(
		"resolve & evaluate - %s",
		(_: string, policy: MCCPolicy[], category: string, resolved: MCCPolicy[], evaluated: boolean | undefined) => {
			const transaction = {
				counterpart: {
					type: "card",
					acquirer: { id: "acquirer", number: "acquirer" },
					merchant: {
						name: "FinalFlight",
						id: "final",
						category,
						address: "123 Main St",
						city: "Bristol",
						zip: "12345",
						country: "GB",
					},
				},
			} as Transaction
			expect(MCCPolicy.resolve(policy, transaction)).toEqual(resolved)
			expect(MCCPolicy.isAllowed(policy, transaction)).toBe(evaluated)
		}
	)
})
