import { pax2pay } from "../../index"

describe("Card.Operation", () => {
	const operation: pax2pay.Card.Operation = {
		type: "authorization",
		id: "19236hf",
		status: pax2pay.Card.Operation.fromEntryStatus("capture"),
		created: "2023-12-13T12:11:00.000Z",
	}
	it("authorization", () => {
		expect(pax2pay.Card.Operation.is(operation)).toBeTruthy()
	})
})
