import { pax2pay } from "../../index"

describe("Card.Restrictions", () => {
	const transaction: pax2pay.Transaction.Creatable.CardTransaction = {
		account: { id: "card1", type: "card" },
		accountId: "account1",
		reference: { reference: "1234567890" },
		counterpart: {
			type: "card",
			merchant: { name: "RYANAIR", category: "3246", address: "", city: "", country: "AD", zip: "", id: "merchant1" },
			acquirer: { id: "acquirer1", number: "1234567890", retrievalReferenceNumber: "1234567890" },
		},
		currency: "EUR",
		amount: 100,
		description: "Test transaction",
	}
	it("should allow ryanair", () => {
		expect(pax2pay.Card.Restriction.check({ merchants: ["ryanair"] }, transaction)).toBe(true)
	})
	it("should block iberia", () => {
		expect(pax2pay.Card.Restriction.check({ merchants: ["iberia"] }, transaction)).toBe(false)
	})
	it("should allow empty restrictions", () => {
		expect(pax2pay.Card.Restriction.check({}, transaction)).toBe(true)
	})
})
