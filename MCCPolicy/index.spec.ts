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
				realm: "test",
				created: "2024-01-01T00:00:00Z",
				updated: "2024-01-01T00:00:00Z",
				id: "test-policy",
				action: "allow",
				name: "Test policy",
				group: { values: ["5411"], ranges: [] },
			}
			const input: MCCPolicy.TransactionInput = { category: "5411", cardPreset: transactionPreset, org: "test-org" }
			expect(MCCPolicy.match(policy, input)).toBe(isMatch)
		}
	)
	it.each([
		["global policy applies to any org", undefined, "org-a", true],
		["global policy applies when no org", undefined, undefined, true],
		["org policy matches its org", "org-a", "org-a", true],
		["org policy excludes other org", "org-a", "org-b", false],
		["org policy excludes missing org", "org-a", undefined, false],
	])("MCC.match org - %s", (_: string, organization: string | undefined, org: string | undefined, isMatch: boolean) => {
		const policy: MCCPolicy = {
			organization,
			stacks: undefined,
			realm: "test",
			created: "2024-01-01T00:00:00Z",
			updated: "2024-01-01T00:00:00Z",
			id: "test-policy",
			action: "allow",
			name: "Test policy",
			group: { values: ["5411"], ranges: [] },
		}
		const input: MCCPolicy.TransactionInput = { category: "5411", org }
		expect(MCCPolicy.match(policy, input)).toBe(isMatch)
	})
	const allow: MCCPolicy = {
		id: "allow-5411",
		realm: "test",
		organization: "test-org",
		created: "2024-01-01T00:00:00Z",
		updated: "2024-01-01T00:00:00Z",
		action: "allow",
		name: "Allow groceries",
		stacks: undefined,
		group: { values: ["5411"], ranges: [] },
	}
	const block: MCCPolicy = {
		id: "block-5542",
		realm: "test",
		organization: "test-org",
		created: "2024-01-01T00:00:00Z",
		updated: "2024-01-01T00:00:00Z",
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
		["wrong organization excluded", [{ ...allow, organization: "other-org" }], "5411", [], undefined],
	])(
		"resolve & evaluate - %s",
		(
			_: string,
			policy: MCCPolicy[],
			category: Merchant.Category,
			resolved: MCCPolicy[],
			evaluated: boolean | undefined
		) => {
			const input: MCCPolicy.TransactionInput = { category, org: "test-org" }
			expect(MCCPolicy.resolve(policy, input)).toEqual(resolved)
			expect(MCCPolicy.isAllowed(policy, input)).toBe(evaluated)
		}
	)
})
