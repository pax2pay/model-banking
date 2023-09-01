import "jest"
import { pax2pay } from "../index"

describe("transaction", () => {
	it("test", async () => {
		expect(pax2pay.Transaction.Note.Creatable.is({ text: "text", action: "approve" })).toBeTruthy()
		expect(pax2pay.Transaction.Note.Creatable.is({})).toBeTruthy()
	})
})
