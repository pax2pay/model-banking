import { pax2pay } from "../index"

describe("Account.Charge", () => {
	it("should charge merchant", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges.merchant,
				transaction.ryanair.counterpart,
				transaction.ryanair.currency,
				transaction.ryanair.amount,
				undefined,
				transaction.ryanair.exchange
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
	it("should charge merchant", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges.merchantPreset,
				transaction.ryanair.counterpart,
				transaction.ryanair.currency,
				transaction.ryanair.amount,
				"test-ta-pg-200",
				transaction.ryanair.exchange
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
	it("should charge fx", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges.fx,
				transaction.fxCharge.counterpart,
				transaction.fxCharge.currency,
				transaction.fxCharge.amount,
				undefined,
				transaction.fxCharge.exchange
			)
		).toMatchInlineSnapshot(`
			[
			  {
			    "amount": -2.5,
			    "destination": {
			      "account": "abcd1234",
			    },
			    "type": "exchange",
			  },
			]
		`)
	})
	it("should charge fx with preset", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges.fxPreset,
				transaction.fxCharge.counterpart,
				transaction.fxCharge.currency,
				transaction.fxCharge.amount,
				"test-ta-pg-200",
				transaction.fxCharge.exchange
			)
		).toMatchInlineSnapshot(`
			[
			  {
			    "amount": -2.5,
			    "destination": {
			      "account": "abcd1234",
			    },
			    "type": "exchange",
			  },
			]
		`)
	})
	it("should not charge", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges.merchant,
				transaction.noCharge.counterpart,
				transaction.noCharge.currency,
				transaction.noCharge.amount,
				undefined,
				transaction.noCharge.exchange
			)
		).toMatchInlineSnapshot(`[]`)
	})
	it("should not charge", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges.fx,
				transaction.noCharge.counterpart,
				transaction.noCharge.currency,
				transaction.noCharge.amount,
				undefined,
				transaction.noCharge.exchange
			)
		).toMatchInlineSnapshot(`[]`)
	})
})
const charges: Record<string, pax2pay.Account.Charge[]> = {
	merchant: [
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
	],
	fx: [
		{
			id: "abcd1234",
			destination: { account: "abcd1234" },
			rate: 0.025,
			applies: {
				to: {
					fx: true,
				},
			},
		},
	],
	fxPreset: [
		{
			id: "abcd1234",
			destination: { account: "abcd1234" },
			rate: 0.025,
			applies: {
				to: {
					fx: true,
					presets: ["test-ta-pg-200"],
				},
			},
		},
	],
	merchantPreset: [
		{
			id: "abcd1234",
			destination: { account: "abcd1234" },
			rate: 0.025,
			applies: {
				to: {
					merchants: ["ryanair"],
					presets: ["test-ta-pg-200"],
				},
			},
		},
	],
}
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
	fxCharge: {
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
		exchange: { from: ["USD", 100], rate: 1 },
		description: "Test transaction",
	},
}
