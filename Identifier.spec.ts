import { pax2pay } from "./index"

describe("sda", () => {
	it("dwa", () => {
		const now = "2023-09-11T18:17:03.575Z"
		const id = pax2pay.Identifier.generate(now)
		const extracted = pax2pay.Identifier.timeOf(id)
		expect(extracted).toEqual(now)
	})
})
