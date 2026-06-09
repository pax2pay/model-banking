import { Transaction } from "../index"
import { Condition } from "./index"

function transaction(category: string): Transaction {
	return {
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
}

const allow: Condition = {
	id: "allow-5411",
	policy: "allow",
	description: "Allow groceries",
	stacks: undefined,
	set: { values: ["5411"], ranges: [] },
}
const block: Condition = {
	id: "block-5500",
	policy: "block",
	description: "Block fuel",
	stacks: undefined,
	set: { values: ["5500"], ranges: [] },
}

describe("Condition", () => {
	it.each([
		["no conditions", [], "5411", [], undefined],
		["no match", [allow, block], "7000", [], undefined],
		["allow match", [allow, block], "5411", [allow], true],
		["block match", [allow, block], "5500", [block], false],
		["block wins over allow", [{ ...allow, set: block.set }, block], "5500", [block], false],
	])(
		"resolve & evaluate - %s",
		(_: string, conditions: Condition[], category: string, resolved: Condition[], evaluated: boolean | undefined) => {
			expect(Condition.resolve(conditions, transaction(category))).toEqual(resolved)
			expect(Condition.evaluate(conditions, transaction(category))).toBe(evaluated)
		}
	)
})
