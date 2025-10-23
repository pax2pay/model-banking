import { Account } from "Account"
import { pax2pay } from "../../index"

describe("Account.Charge", () => {
	it("should charge merchant", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges,
				transaction.ryanair.counterpart,
				transaction.ryanair.currency,
				transaction.ryanair.amount,
				"test-ta-pg-200",
				transaction.ryanair.exchange
			)
		).toMatchInlineSnapshot(`
			{
			  "amount": -2.5,
			  "charge": {
			    "merchant": {
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
			    },
			  },
			}
		`)
	})
	it("should charge for fx", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges,
				transaction.fxCharge.counterpart,
				transaction.fxCharge.currency,
				transaction.fxCharge.amount,
				"test-ta-pg-200",
				transaction.fxCharge.exchange
			)
		).toMatchInlineSnapshot(`
			{
			  "amount": -2.5,
			  "charge": {
			    "fx": {
			      "amount": -2.5,
			      "default": 0.1,
			      "test-ta-pg-200": 0.025,
			    },
			  },
			}
		`)
	})
	it("should charge for merchant and fx at default rate", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges,
				transaction.ryanair.counterpart,
				transaction.ryanair.currency,
				transaction.ryanair.amount,
				"test-ta-mc-200",
				transaction.fxCharge.exchange
			)
		).toMatchInlineSnapshot(`
			{
			  "amount": -11,
			  "charge": {
			    "fx": {
			      "amount": -10,
			      "default": 0.1,
			      "test-ta-pg-200": 0.025,
			    },
			    "merchant": {
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
			    },
			  },
			}
		`)
	})
	it("should not charge", () => {
		expect(
			pax2pay.Account.Charge.evaluate(
				charges,
				transaction.noCharge.counterpart,
				transaction.noCharge.currency,
				transaction.noCharge.amount,
				"test-ta-pg-200",
				transaction.noCharge.exchange
			)
		).toMatchInlineSnapshot(`
			{
			  "amount": 0,
			  "charge": {},
			}
		`)
	})
})
export const charges: Account.Charge = {
	fx: {
		"test-ta-pg-200": 0.025,
		default: 0.1,
	},
	merchant: {
		destination: { account: "abcd1234" },
		merchants: {
			ryanair: { "test-ta-pg-200": 0.025, default: 0.01 },
			lufthansa: { "test-ta-pg-200": 0.025, default: 0 },
		},
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
	fxCharge: {
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
		exchange: { from: ["USD", 100], rate: 1 },
		description: "Test transaction",
	},
}
