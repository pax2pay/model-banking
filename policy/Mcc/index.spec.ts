import { Card } from "../../Card"
import { Merchant } from "../../Merchant"
import { Mcc } from "./index"

describe("Mcc", () => {
	it.each([
		["all stacks", undefined, "p2p-diners-175" as Card.Preset, true],
		["stack no match", ["test-paxgiro", "uk-diners-dpg"] as Card.Stack[], "p2p-visa-idx-200" as Card.Preset, false],
		["stack precise match", ["test-paxgiro", "uk-diners-dpg"] as Card.Stack[], "p2p-diners-200" as Card.Preset, true],
	])(
		"MCC.match stacks - %s",
		(_: string, stacks: Card.Stack[] | undefined, transactionPreset: Card.Preset, isMatch: boolean) => {
			const policy: Mcc = {
				stacks,
				realm: "test",
				created: "2024-01-01T00:00:00Z",
				updated: "2024-01-01T00:00:00Z",
				id: "test-policy",
				action: "allow",
				name: "Test policy",
				group: { values: ["5411"], ranges: [] },
			}
			const input: Mcc.TransactionInput = { category: "5411", preset: transactionPreset, organization: "test-org" }
			expect(Mcc.match(policy, input)).toBe(isMatch)
		}
	)
	it.each([
		["global policy applies to any org", undefined, "org-a", true],
		["global policy applies when no org", undefined, undefined, true],
		["org policy matches its org", "org-a", "org-a", true],
		["org policy excludes other org", "org-a", "org-b", false],
		["org policy excludes missing org", "org-a", undefined, false],
	])("MCC.match org - %s", (_: string, organization: string | undefined, org: string | undefined, isMatch: boolean) => {
		const policy: Mcc = {
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
		const input: Mcc.TransactionInput = { category: "5411", organization: org }
		expect(Mcc.match(policy, input)).toBe(isMatch)
	})
	const allow: Mcc = {
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
	const block: Mcc = {
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
		(_: string, policy: Mcc[], category: Merchant.Category, resolved: Mcc[], evaluated: boolean | undefined) => {
			const input: Mcc.TransactionInput = { category, organization: "test-org" }
			expect(Mcc.resolve(policy, input)).toEqual(resolved)
			expect(Mcc.isAllowed(policy, input)).toBe(evaluated)
		}
	)
})
