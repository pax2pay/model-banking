import { pax2pay } from "../index"

describe("transaction", () => {
	it("note", async () => {
		expect(pax2pay.Transaction.Note.Creatable.type.is({ text: "text", action: "approve", flags: [] })).toBeTruthy()
		expect(pax2pay.Transaction.Note.Creatable.type.is({})).toBeTruthy()
	})
	it("creatable", async () => {
		expect(pax2pay.Rail.Address.type.is(transaction.counterpart)).toBeTruthy()
		expect(pax2pay.Transaction.Creatable.type.is(transaction)).toBeTruthy()
	})
})
const transaction: pax2pay.Transaction.Creatable = {
	counterpart: { type: "internal", identifier: "target12" },
	currency: "USD",
	amount: 100,
	description: "internal transaction",
}
