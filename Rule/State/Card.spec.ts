import { isoly } from "isoly"
import { pax2pay } from "../../index"

describe("State.Card", () => {
	it("ageFromTime", () => {
		expect(pax2pay.Rule.State.Card.ageFromTime(isoly.DateTime.now())).toEqual({ days: 0, minutes: 0 })
	})
})
