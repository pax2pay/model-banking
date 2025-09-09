import { pax2pay } from "../index"

describe("Account.Charge", () => {
	it("should charge", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges,
				transaction.ryanair.counterpart,
				transaction.ryanair.currency,
				transaction.ryanair.amount
			)
		).toMatchInlineSnapshot(`
			[
			  {
			    "amount": -2.5,
			    "destination": {
			      "account": "abcd1234",
			    },
			    "type": "merchant",
			  },
			]
		`)
	})
	it("should not charge", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges,
				transaction.noCharge.counterpart,
				transaction.noCharge.currency,
				transaction.noCharge.amount
			)
		).toMatchInlineSnapshot(`[]`)
	})
})
const charges: pax2pay.Account.Charge[] = [
	{
		id: "abcd1234",
		destination: { account: "abcd1234" },
		rate: 0.025,
		applies: {
			to: {
				merchants: ["ryanair"],
			},
		},
	},
]
const transaction: Record<string, pax2pay.Transaction.Creatable.CardTransaction> = {
	ryanair: {
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
	},
	noCharge: {
		account: { id: "card1", type: "card" },
		accountId: "account1",
		reference: { reference: "1234567890" },
		counterpart: {
			type: "card",
			merchant: { name: "Paxair", category: "1234", address: "", city: "", country: "AD", zip: "", id: "merchant1" },
			acquirer: { id: "acquirer1", number: "1234567890", retrievalReferenceNumber: "1234567890" },
		},
		currency: "EUR",
		amount: 100,
		description: "Test transaction",
	},
}
