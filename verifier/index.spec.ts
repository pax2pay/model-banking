import { isoly } from "isoly"
import * as authly from "authly"
import { pax2pay } from "../index"
import { verifier } from "."

const now = new Date(Math.floor(new Date().getTime() / 1000) * 1000)

describe("verifier", () => {
	const privateKey =
		"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNYqpd/DwdTqUy2gt1zVYSQRk/8OaHHwmZ8wxDFxQiIVSQ5sv3MASj+mTj/UUJoDL+XXjJfvo5T3sRqeerwU5uN3y1TlQ6pvif1Glc7eZ3UkMhmS6qGNDC4IlrH/SfI1j5YfkwtYIGCjmTDpH4AcF0JdAZIagwZ+bSpADJIMTU+ZlZz/qxHhZpwr6igw79i0/se5BB4byqwnjjBtBdpiUq6nEmvcQOj5Sfg3388eZeVNPPW7v9o7YpvM/5XqR6+8/N/6ZL4q9IsxgyAi4OJBe+Wiv1R4LUzlU2PtOvHocqeiJ6QpS3e0vXhwgdUqGk5OU3aXbKPgiaYAbepniAw7oPAgMBAAECggEBAMJ9KC+P560pCC67ZBbNty/aDXsLOIHD1me+TGJLvHkFbvs4UvVkt0BAoMF02Kdg2GkfQn4si+8xYK09Y3C1wPuF98YIwqI380AG+S9S6OcdMwzh7dqNXULtNbQHsrHv2xVsvXhuqQ3nKNYk+f0MTJEcLY9e29Ha0i2tuEC9kybI8mvzTHXjEboypN3wYP2m+G2+GrjIeLxLPpGBvTLO9/vzQlahlBwEU3JKFC9/qXT8HymCLAS6k7E6USSEGw2kCYx/TrG0VWXuxpXx86dSwAmgaqp44ykLA89stMjeuFVaKbP+CCuWrlx95sUK7pvQv/xEtT+ThVlRi05Fp2JBzeECgYEA83ejxhzxF+npMvNymMw+NyeYrPwMjGw9hdXHF0um10u9I6KDIn/PMTnVWDa0oQ1rKElrzzD0lWLJw/oDfSP4SH5MhAuX/syWZqJW/hucjPq4Puf+et4Fve2q15L5jVPmwYGqI/Bmy+OaePdnGFr8RfI9Sil2dklkcIEQuv0cFlMCgYEA1/UwtU7kvdR+fDAS7LRx0UmWLTbvux93UzHxqn+XNauma8lZOkKRh6/PJ3emUscMI2PgGFTdn65BwmUj8icVpioXo71/vbmfvFluMjPgbllvhEwFTsZUgkCSx4ivPgh2Pk/VOflT6xu4q1F5NUZpzX/cW1a9fHM93a4V0v9zXdUCgYBCZ6hYub4caqU7S2E/Qb3aZ0diLyDxD/i7zzINLYolALhmxsWDnF6Tq5WACPO9VZ6bj2MDUPP05svnUwKumCf5BdGy1kKvsXd4KOEXT8qkPSIRrk8fjfz8750ATUsZe//dWZNhWAmBpOOWCMyqvO4/2bFTz/lKi/wEH3/DsJN/lwKBgFYhSi3lq0EysMei/Mk/Jm3MJYMe9/nvkM2zi6jufkY/kX5HrbiYuCYfrkUVaVZ2YJb0zHmnz0RSYZPAdterUu0UuJzrhTkMAXNDT7niCs64CMwA7dT/MNFKI8BE+W+KPG6ZtHcMw7VvNvXM5sSisqvtJNug+q3Z4IC7X6TpkP+JAoGAPLqj9DG52nNdY+BwqJLWG5nIZxfWXcYlsr5dwwVYptc4Dont5R63r3Mk8q94+1VC+Vewzfba+y1+kYyK0twdkXNLNDuvHydOXX7LR1L66iEd//rlvWCvuqFkOgnEJk5iPBiF8Z7dFA5+HoHgeBBiF3Na1R3aWiCxnIPbcchRZgQ="
	const publicKey =
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWKqXfw8HU6lMtoLdc1WEkEZP/Dmhx8JmfMMQxcUIiFUkObL9zAEo/pk4/1FCaAy/l14yX76OU97Eannq8FObjd8tU5UOqb4n9RpXO3md1JDIZkuqhjQwuCJax/0nyNY+WH5MLWCBgo5kw6R+AHBdCXQGSGoMGfm0qQAySDE1PmZWc/6sR4WacK+ooMO/YtP7HuQQeG8qsJ44wbQXaYlKupxJr3EDo+Un4N9/PHmXlTTz1u7/aO2KbzP+V6kevvPzf+mS+KvSLMYMgIuDiQXvlor9UeC1M5VNj7Trx6HKnoiekKUt3tL14cIHVKhpOTlN2l2yj4ImmAG3qZ4gMO6DwIDAQAB"
	it("Verifier test", async () => {
		const issuer = authly.Issuer.create<pax2pay.Transaction.Event>(
			"pax2pay",
			authly.Algorithm.RS256(publicKey, privateKey)
		)
		if (issuer) {
			const token = await issuer.sign(transaction, Math.floor(now.getTime() / 1000))
			expect(await verifier.verify(token)).toEqual(transaction)
		}
	})
})

const transaction: pax2pay.Transaction.Event = {
	organization: "organization",
	accountId: "qwerty12",
	account: {
		type: "internal",
		identifier: "12345678",
	},
	id: "11112222",
	posted: `${isoly.DateTime.now()}`,
	balance: {
		actual: 420,
		reserved: 420,
		available: 420,
	},
	amount: { original: -1, reserved: 0, charge: 0, total: -1 }, //
	currency: "USD",
	description: "string",
	counterpart: {
		type: "card",
		scheme: "mastercard",
		iin: "111111",
		expiry: [26, 12],
		last4: "1111",
		holder: "name",
		id: "zzzzztgH3XvVz0-T",
		merchant: {
			name: "Merchant",
			id: "abcd1234",
			category: "4511",
			country: "GB",
			city: "Towncity",
			zip: "12345",
			address: "Streetname 1, 12345 Towncity",
		},
		acquirer: {
			id: "2345erty",
			number: "1351858913568",
			country: "GB",
		},
	},
	operations: [
		{
			account: "WzauRHBO",
			currency: "USD",
			changes: {
				"reserved-outgoing": {
					type: "add",
					amount: 1,
					status: "pending",
				},
			},
			transaction: "i9knT4yR",
			type: "authorization",
			counter: 0,
			created: "2023-08-29T13:28:37.269Z",
		},
	],
	status: ["rejected", "denied"],
	rail: "mastercard",
	flags: [],
	oldFlags: [],
	notes: [],
}
