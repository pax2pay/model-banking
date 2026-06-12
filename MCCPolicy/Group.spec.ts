import { MCCPolicy } from "./index"

describe("MCCPolicy.Group", () => {
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
	])("MCCPolicy.Group.within - %s", (_: string, set: MCCPolicy.Group, category: string, isWithin: boolean) => {
		expect(MCCPolicy.Group.within(set, category)).toBe(isWithin)
	})
})
