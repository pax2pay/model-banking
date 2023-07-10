import { pax2pay } from "../index"

describe("Card.Preset", () => {
	it("is() truthy", () => {
		expect(pax2pay.Card.Preset.is("p2p-mc-200")).toBeTruthy()
	})
	it("is() falsy", () => {
		expect(pax2pay.Card.Preset.is("not a preset")).toBeFalsy()
	})
})
