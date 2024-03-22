import { pax2pay } from "../index"
import { Status } from "./Status"

describe("Status", () => {
	it("Failed.from", () => {
		expect(Status.Failed.from(data)).toEqual({
			code: "62",
			error: [
				{
					author: "automatic",
					created: "2024-03-21T17:00:20.441Z",
					rule: {
						action: "flag",
						condition: "!data.merchant.known:some(authorization.merchant.name)",
						description: "Flag authorizations involving a new merchant",
						flags: ["merchant", "new"],
						name: "New Merchant",
						type: "authorization",
					},
				},
				{
					author: "automatic",
					created: "2024-03-21T17:00:20.441Z",
					rule: {
						action: "flag",
						condition: "!(account.days.currency<30)",
						description: "Flag first authorization using a to the account new currency.",
						flags: ["unusual", "currency"],
						name: "Unusual Currency",
						type: "authorization",
					},
				},
				{
					author: "automatic",
					created: "2024-03-21T17:00:20.441Z",
					rule: {
						action: "flag",
						condition: "!(account.days.merchant.name<30)",
						description: "Flag first transaction from a to the account new merchant",
						flags: ["unusual", "merchant"],
						name: "Unusual Merchant",
						type: "authorization",
					},
				},
				{
					author: "automatic",
					created: "2024-03-21T17:00:20.441Z",
					rule: {
						action: "flag",
						condition: "!(account.days.merchant.category<30)",
						description: "Flag first transaction from a merchant with a to the account new category code.",
						flags: ["unusual", "merchant", "category"],
						name: "Unusual MCC",
						type: "authorization",
					},
				},
				{
					author: "automatic",
					created: "2024-03-21T17:00:20.441Z",
					rule: {
						action: "flag",
						condition: "!(account.days.merchant.country<30)",
						description: "Flag first transaction from a merchant in a to the account new country.",
						flags: ["unusual", "merchant", "country"],
						name: "Unusual Country",
						type: "authorization",
					},
				},
				{
					author: "automatic",
					created: "2024-03-21T17:00:20.441Z",
					rule: {
						action: "flag",
						condition: "transaction.amount<5",
						description: "Flag authorizations with an amount below 5 GBP.",
						flags: ["low", "amount"],
						name: "Low Amount",
						type: "authorization",
					},
				},
				{ author: "automatic", created: "2024-03-21T17:00:20.441Z", text: "Not enough funds available in GBP" },
			],
			reason: ["Restricted card.", "2024-03-21T17:00:20.441Z automatic: Not enough funds available in GBP"],
		})
	})
})

const data: pax2pay.Transaction.Note[] = [
	{
		author: "automatic",
		created: "2024-03-21T17:00:20.441Z",
		rule: {
			name: "New Merchant",
			action: "flag",
			type: "authorization",
			condition: "!data.merchant.known:some(authorization.merchant.name)",
			description: "Flag authorizations involving a new merchant",
			flags: ["merchant", "new"],
		},
	},
	{
		author: "automatic",
		created: "2024-03-21T17:00:20.441Z",
		rule: {
			name: "Unusual Currency",
			action: "flag",
			type: "authorization",
			condition: "!(account.days.currency<30)",
			description: "Flag first authorization using a to the account new currency.",
			flags: ["unusual", "currency"],
		},
	},
	{
		author: "automatic",
		created: "2024-03-21T17:00:20.441Z",
		rule: {
			name: "Unusual Merchant",
			action: "flag",
			type: "authorization",
			condition: "!(account.days.merchant.name<30)",
			description: "Flag first transaction from a to the account new merchant",
			flags: ["unusual", "merchant"],
		},
	},
	{
		author: "automatic",
		created: "2024-03-21T17:00:20.441Z",
		rule: {
			name: "Unusual MCC",
			action: "flag",
			type: "authorization",
			condition: "!(account.days.merchant.category<30)",
			description: "Flag first transaction from a merchant with a to the account new category code.",
			flags: ["unusual", "merchant", "category"],
		},
	},
	{
		author: "automatic",
		created: "2024-03-21T17:00:20.441Z",
		rule: {
			name: "Unusual Country",
			action: "flag",
			type: "authorization",
			condition: "!(account.days.merchant.country<30)",
			description: "Flag first transaction from a merchant in a to the account new country.",
			flags: ["unusual", "merchant", "country"],
		},
	},
	{
		author: "automatic",
		created: "2024-03-21T17:00:20.441Z",
		rule: {
			name: "Low Amount",
			action: "flag",
			type: "authorization",
			condition: "transaction.amount<5",
			description: "Flag authorizations with an amount below 5 GBP.",
			flags: ["low", "amount"],
		},
	},
	{
		author: "automatic",
		created: "2024-03-21T17:00:20.441Z",
		action: "reject",
		text: "Not enough funds available in GBP",
	},
]
pax2pay
