import { pax2pay } from "../index"

const preset: pax2pay.Card.Preset = "example1"

describe("Card.Preset", () => {
	it("is() truthy", () => {
		expect(pax2pay.Card.Preset.is(preset)).toBeTruthy()
	})
	it("is() falsy", () => {
		expect(pax2pay.Card.Preset.is("not a preset")).toBeFalsy()
	})
})
