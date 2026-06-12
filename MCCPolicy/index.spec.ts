import { Card } from "../Card"
import { Merchant } from "../Merchant"
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
				id: "test-policy",
				action: "allow",
				name: "Test policy",
				group: { values: ["5411"], ranges: [] },
			}
			const input: MCCPolicy.TransactionInput = { category: "5411", cardPreset: transactionPreset }
			expect(MCCPolicy.match(policy, input)).toBe(isMatch)
		}
	)
	const allow: MCCPolicy = {
		id: "allow-5411",
		action: "allow",
		name: "Allow groceries",
		stacks: undefined,
		group: { values: ["5411"], ranges: [] },
	}
	const block: MCCPolicy = {
		id: "block-5542",
		action: "block",
		name: "Block fuel",
		stacks: undefined,
		group: { values: ["5542"], ranges: [] },
	}
	it.each([
		["no policies", [], "5411", [], undefined],
		["no match", [allow, block], "7000", [], undefined],
		["allow match", [allow, block], "5411", [allow], true],
		["block match", [allow, block], "5542", [block], false],
		["block wins over allow", [{ ...allow, group: block.group }, block], "5542", [block], false],
	])(
		"resolve & evaluate - %s",
		(
			_: string,
			policy: MCCPolicy[],
			category: Merchant.Category,
			resolved: MCCPolicy[],
			evaluated: boolean | undefined
		) => {
			const input: MCCPolicy.TransactionInput = { category }
			expect(MCCPolicy.resolve(policy, input)).toEqual(resolved)
			expect(MCCPolicy.isAllowed(policy, input)).toBe(evaluated)
		}
	)
})
