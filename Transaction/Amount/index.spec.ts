import { pax2pay } from "../../index"

// cSpell:disable
describe("Transaction.Amount", () => {
	it("is", () => {
		expect(pax2pay.Transaction.Amount.Charge.Fx.type.is(charges.fx)).toBeTruthy()
	})
	it("fromState", () => {
		expect(pax2pay.Transaction.Amount.fromState(state, undefined)).toMatchInlineSnapshot(`
			{
			  "charge": 0,
			  "charges": undefined,
			  "exchange": {
			    "from": [
			      "GBP",
			      100,
			    ],
			    "rate": 1,
			  },
			  "original": -100,
			  "total": -100,
			}
		`)
	})
	it("fromState with merchant charge", () => {
		expect(pax2pay.Transaction.Amount.fromState(state, { merchant: charges.merchant })).toMatchInlineSnapshot(`
			{
			  "charge": 0,
			  "charges": {
			    "merchant": {
			      "amount": -1,
			      "destination": {
			        "account": "abcd1234",
			      },
			      "merchant": "ryanair",
			      "preset": "test-ta-pg-200",
			      "rate": 0.01,
			    },
			  },
			  "exchange": {
			    "from": [
			      "GBP",
			      100,
			    ],
			    "rate": 1,
			  },
			  "original": -100,
			  "total": -101,
			}
		`)
	})
	it("fromState with fx charge", () => {
		expect(pax2pay.Transaction.Amount.fromState(state, { fx: charges.fx })).toMatchInlineSnapshot(`
			{
			  "charge": 0,
			  "charges": {
			    "fx": {
			      "amount": -10,
			      "preset": "test-ta-pg-200",
			      "rate": 0.1,
			    },
			  },
			  "exchange": {
			    "from": [
			      "GBP",
			      100,
			    ],
			    "rate": 1,
			  },
			  "original": -100,
			  "total": -110,
			}
		`)
	})
	it("fromState with fx and merchant charge", () => {
		expect(pax2pay.Transaction.Amount.fromState(state, charges)).toMatchInlineSnapshot(`
			{
			  "charge": 0,
			  "charges": {
			    "fx": {
			      "amount": -10,
			      "preset": "test-ta-pg-200",
			      "rate": 0.1,
			    },
			    "merchant": {
			      "amount": -1,
			      "destination": {
			        "account": "abcd1234",
			      },
			      "merchant": "ryanair",
			      "preset": "test-ta-pg-200",
			      "rate": 0.01,
			    },
			  },
			  "exchange": {
			    "from": [
			      "GBP",
			      100,
			    ],
			    "rate": 1,
			  },
			  "original": -100,
			  "total": -111,
			}
		`)
	})
})

const charges: pax2pay.Transaction.Amount.Charge = {
	fx: {
		amount: -10,
		rate: 0.1,
		preset: "test-ta-pg-200",
	},
	merchant: {
		amount: -1,
		merchant: "ryanair",
		rate: 0.01,
		preset: "test-ta-pg-200",
		destination: { account: "abcd1234" },
	},
}

const state: pax2pay.Rule.State = {
	account: {
		id: "WzauRHBO",
		key: "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApCMLTSPm/TbZNUfhvq8UgU7KW7LulUu4iZtGrcEiw/ot3Yuv3aRGizi9V2G0Bzh22IduXbjAf5m9N8JiMiuquHdjE0Z5egLK5Wrr8sylbAkArLh9fJshqNFFavJFIk38jSinrz0PH3+Cpx/5TQq1Gnlkl0GebfTx9t0l9/y34w3IH9pXKfxQj2SmlS3qd/g0l6hVySr5nPGbOkEh3zKhK4Qh2GYimv3lck2eGaNB6ct+B2AVswdADQf5D6ToSqmnt0z+aWDUsM9eHbHZh3BMHtpZInDIR8XdwqV9q7mUtDJTv7t1WSBGikjGNMDV/YE2Xp2DUhoggBkGLDfoihrGAH5gUe0w1DYwzEZlscuVkJBDK4cgJHDHX0EM83+5wKGX5Sp40fjq26YVdxR5h+hdJc+DsO8r/md4DNrx6pSSH29e+GnzMI+kePiQ5a+7qUjihD7mTvdFp6ea/e8tvmwarAUHGmAFYjaPY3R2jM5PSX0FiSCflVfhj7mbh0vAIUuNDM1/XUEbTYi0KwF9rkAV0OpfBS8ElrHeII139v4OJsBCfard5P5lbXJoib0Udza1MjzUovzgh5qZ4TBJdKZjucTdYM9NM/xQn4qXeVUxebgyxFks6weSH+8yr5po/gOqS318mj/YrlSE4LNSTRYhol45WAIsG7zChzkCAx4gP4UCAwEAAQ==",
		days: {
			currency: 0,
			merchant: {
				name: 0,
				country: 0,
				category: 0,
			},
		},
		name: "upcheck account 2",
		rails: [],
		rules: [],
		status: {
			mode: "active",
		},
		address: {
			id: "zzzyOTugMAvHUG8-",
			iin: "111111",
			type: "card",
			last4: "3081",
			expiry: [26, 12],
			holder: "Upcheck",
			scheme: "mastercard",
		},
		created: "2023-08-09T16:08:48.309Z",
		details: {
			supplier: "paxgiro",
			addresses: [
				{
					type: "paxgiro",
					identifier: "kOXi7IgA",
				},
			],
			reference: "",
			currencies: ["GBP", "SEK", "USD", "EUR"],
		},
		balances: {
			GBP: {
				actual: 55343941.4,
				reserved: {
					incoming: 17856.1,
					outgoing: 4705464.49,
				},
				available: 50620620.81,
				incomingReserved: 17856.1,
				outgoingReserved: 4705464.49,
			},
			USD: {
				actual: 309259.12,
				reserved: {
					incoming: 676,
					outgoing: 0,
				},
				available: 308583.12,
				incomingReserved: 676,
				outgoingReserved: 0,
			},
		},
		counterparts: {},
		organization: "agpiPo0v",
		transactions: {
			card: {
				today: {
					count: 83,
					amount: 35683,
				},
			},
			today: {
				count: 82,
				amount: 34882,
			},
			incoming: {
				today: {
					count: 0,
					amount: 0,
				},
			},
			outgoing: {
				today: {
					count: 0,
					amount: 0,
				},
			},
		},
		charges: { fx: { "test-ta-mc-200": 0.025, default: 0.01 } },
	},
	transaction: {
		id: "tr_yOTugJGf_KlST",
		kind: "authorization",
		type: "card",
		stage: "initiate",
		amount: 100,
		account: {
			id: "zzzyOTugMAvHUG8-",
			type: "card",
		},
		currency: "GBP",
		original: {
			total: 100,
			amount: 100,
			currency: "GBP",
		},
		accountId: "WzauRHBO",
		reference: {
			reference: "zzzyOTugJfbXP1OU",
		},
		counterpart: {
			type: "card",
			acquirer: {
				id: "2345erty",
				number: "1351858913568",
				country: "GB",
			},
			merchant: {
				id: "abcd1234",
				zip: "12345",
				city: "upcheck town",
				name: "paxair",
				address: "Streetname 1, 12345 Towncity",
				country: "GB",
				category: "4511",
			},
		},
		description: "An upcheck test authorization, to succeed. with high realm amount flag.",
		exchange: {
			rate: 1,
			from: ["GBP", 100],
		},
	},
	authorization: {
		card: "zzzyOTugMAvHUG8-",
		hour: 13,
		time: "13:48:08.293Z",
		amount: 100,
		account: "WzauRHBO",
		acquirer: {
			id: "2345erty",
			number: "1351858913568",
			country: "GB",
		},
		currency: "GBP",
		merchant: {
			id: "abcd1234",
			zip: "12345",
			city: "upcheck town",
			name: "paxair",
			address: "Streetname 1, 12345 Towncity",
			country: "GB",
			category: "4511",
			reference: "2345erty-abcd1234",
		},
		reference: "zzzyOTugJfbXP1OU",
		description: "An upcheck test authorization, to succeed. with high realm amount flag.",
	},
	card: {
		id: "zzzyOTugMAvHUG8-",
		age: {
			days: 0,
			minutes: 44,
		},
		used: {
			count: 0,
			amount: 0,
			merchants: [],
		},
		limit: 9000,
		realm: "test",
		rules: [],
		spent: ["GBP", 0],
		preset: "test-ta-pg-200",
		reject: {
			count: 0,
		},
		scheme: "mastercard",
		status: "active",
		account: "WzauRHBO",
		created: "2025-10-23T13:48:07.543Z",
		details: {
			iin: "111111",
			last4: "3081",
			expiry: [26, 12],
			holder: "Upcheck",
		},
		history: [
			{
				type: "card",
				status: "created",
				created: "2025-10-23T13:48:07.543Z",
			},
			{
				id: "tr_yOTugJGf_KlST",
				type: "authorization",
				status: "created",
				created: "2025-10-23T13:48:08.862Z",
			},
		],
		original: {
			limit: 9000,
			currency: "GBP",
		},
		reference: "zzzyOTugMAvHUG8-WzauRHBO",
		organization: "agpiPo0v",
	},
	organization: {
		code: "agpiPo0v",
		name: "upcheck org",
		realm: "test",
		rules: [
			{
				code: "merchant-locked-card",
				name: "merchant locked card",
				type: "authorization",
				flags: ["merchant"],
				action: "reject",
				category: "fincrime",
				condition: "card.used.merchants.length>0 !card.used.merchants:some(authorization.merchant.reference)",
				description: "Card locked to merchant.",
			},
		],
		status: "active",
		contact: {
			name: {
				last: "Dirac",
				first: "Paul",
			},
			email: "paul.dirac@spacetime.com",
			phone: {
				code: "+1",
				number: "123456",
			},
			address: {
				primary: {
					city: "Velocity",
					street: "42 Milkyway",
					zipCode: "123456",
					countryCode: "AD",
				},
			},
		},
	},
}
