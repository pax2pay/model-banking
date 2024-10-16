import { pax2pay } from "../../index"

describe("Changes", () => {
	it("split", () => {
		expect(pax2pay.Operation.Changes.Entry.split("test-internal-wIJxbBFE-2024-09-23T06Z")).toEqual([
			"2024-09-23T06Z",
			"test-internal-wIJxbBFE",
		])
		expect(pax2pay.Operation.Changes.Entry.split("2024-09-23T06Z-test-internal-wIJxbBFE")).toEqual([
			"2024-09-23T06Z",
			"test-internal-wIJxbBFE",
		])
	})
})
