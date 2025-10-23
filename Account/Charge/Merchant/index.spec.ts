import { pax2pay } from "../../../index"
import { Merchant } from "./index"

describe("Account.Charge.Merchant", () => {
	it("charge should apply to merchant with default rate", () => {
		expect(
			Merchant.evaluate(
				merchantCharge,
				transaction.ryanair.currency,
				transaction.ryanair.amount,
				transaction.ryanair.counterpart,
				"test-ta-mc-200"
			)
		).toMatchInlineSnapshot(`
			{
			  "amount": -1,
			  "destination": {
			    "account": "abcd1234",
			  },
			  "merchants": {
			    "lufthansa": {
			      "default": 0,
			      "test-ta-pg-200": 0.025,
			    },
			    "ryanair": {
			      "default": 0.01,
			      "test-ta-pg-200": 0.025,
			    },
			  },
			}
		`)
	})
	it("charge should apply to merchant with preset rate", () => {
		expect(
			Merchant.evaluate(
				merchantCharge,
				transaction.ryanair.currency,
				transaction.ryanair.amount,
				transaction.ryanair.counterpart,
				"test-ta-pg-200"
			)
		).toMatchInlineSnapshot(`
			{
			  "amount": -2.5,
			  "destination": {
			    "account": "abcd1234",
			  },
			  "merchants": {
			    "lufthansa": {
			      "default": 0,
			      "test-ta-pg-200": 0.025,
			    },
			    "ryanair": {
			      "default": 0.01,
			      "test-ta-pg-200": 0.025,
			    },
			  },
			}
		`)
	})
	it("charge should not apply", () => {
		expect(
			Merchant.evaluate(
				merchantCharge,
				transaction.noCharge.currency,
				transaction.noCharge.amount,
				transaction.noCharge.counterpart,
				"test-ta-pg-200"
			)
		).toMatchInlineSnapshot(`undefined`)
	})
})
export const merchantCharge: pax2pay.Account.Charge.Merchant = {
	destination: { account: "abcd1234" },
	merchants: {
		lufthansa: { "test-ta-pg-200": 0.025, default: 0 },
		ryanair: { "test-ta-pg-200": 0.025, default: 0.01 },
	},
}
export const transaction: Record<string, pax2pay.Transaction.Creatable.CardTransaction> = {
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
