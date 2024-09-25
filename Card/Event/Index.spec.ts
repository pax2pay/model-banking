import { pax2pay } from "../../index"

describe("Card.Event", () => {
	const event: pax2pay.Card.Event = {
		type: "authorization",
		id: "19236hf",
		outcome: "created",
		created: "2023-12-13T12:11:00.000Z",
		amount: ["UAH", 9999],
	}
	it("authorization", () => {
		expect(pax2pay.Card.Event.type.is(event)).toBeTruthy()
	})
})
