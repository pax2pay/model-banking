import { flagly } from "flagly"
import { userwidgets } from "@userwidgets/model"
import { pax2pay } from "./index"

describe("Identity", () => {
	it.skip("authenticate with empty constraint", async () => {
		const constraint: pax2pay.Key.Permissions = {}
		const header1 = await createHeader({ [`test-*`]: ["finance"] }, "test", orgCode)
		const authenticated = await pax2pay.Identity.authenticate(header1, constraint, undefined, verifier)
		expect(authenticated).toBeTruthy()
		const header2 = await createHeader({ [`test-${orgCode}`]: ["finance"] }, "test", orgCode)
		expect(await pax2pay.Identity.authenticate(header2, constraint, undefined, verifier)).toBeTruthy()
	})
	it.skip("authenticate with empty constraint, returning error if unauth", async () => {
		const constraint: pax2pay.Key.Permissions = {}
		const header = await createHeader(undefined, undefined, undefined)
		const identity = await pax2pay.Identity.authenticate(header, constraint, undefined, verifier, "error")
		expect(identity).toStrictEqual({ status: 401, type: "not authorized", error: undefined })
	})
	it.skip("authenticate finance roll on test", async () => {
		const constraint: pax2pay.Key.Permissions = { treasury: { rebalance: true } }
		const header1 = await createHeader({ [`test-*`]: ["finance"] }, "test", orgCode)
		const header2 = await createHeader({ [`test-${orgCode}`]: ["finance"] }, "test", orgCode)
		expect(await pax2pay.Identity.authenticate(header1, constraint, undefined, verifier)).toBeTruthy()
		expect(await pax2pay.Identity.authenticate(header2, constraint, undefined, verifier)).toBeFalsy()
	})
	it.skip("authenticate finance roll on test, return Error if unauth", async () => {
		const constraint: pax2pay.Key.Permissions = { treasury: { rebalance: true } }
		const header1 = await createHeader({ [`test-*`]: ["finance"] }, "test", orgCode)
		const header2 = await createHeader({ [`test-${orgCode}`]: ["finance"] }, "test", orgCode)
		expect(await pax2pay.Identity.authenticate(header1, constraint, undefined, verifier, "error")).toBeTruthy()
		expect(await pax2pay.Identity.authenticate(header2, constraint, undefined, verifier, "error")).toStrictEqual({
			error: undefined,
			reason: undefined,
			status: 403,
			type: "forbidden",
		})
	})
	it.skip("authenticate finance roll with several constraints", async () => {
		const failingConstraint: pax2pay.Key.Permissions[] = [{ organizations: true }]
		const passingConstraint: pax2pay.Key.Permissions[] = failingConstraint.concat({ treasury: { rebalance: true } })
		const header = await createHeader({ [`test-*`]: ["finance"] }, "test", orgCode)
		expect(await pax2pay.Identity.authenticate(header, failingConstraint, undefined, verifier)).toBeFalsy()
		expect(await pax2pay.Identity.authenticate(header, passingConstraint, undefined, verifier)).toBeTruthy()
	})
	it.skip("authenticate organization finance roll on test", async () => {
		const constraint: pax2pay.Key.Permissions = { cards: { view: true } }
		const header = await createHeader({ [`test-${orgCode}`]: ["finance"] }, "test", orgCode)
		expect(await pax2pay.Identity.authenticate(header, constraint, undefined, verifier)).toBeTruthy()
	})
	it.skip("authenticate admin", async () => {
		const constraint: pax2pay.Key.Permissions = { treasury: { rebalance: true } }
		const header = await createHeader({ [`*-*`]: ["admin"] }, "test", orgCode)
		expect(await pax2pay.Identity.authenticate(header, constraint, undefined, verifier)).toBeTruthy()
	})
	it.skip("authenticate finance roll on several realms", async () => {
		const constraint: pax2pay.Key.Permissions = { treasury: { rebalance: true } }
		const header1 = await createHeader({ [`test-*`]: ["finance"], [`uk-*`]: ["finance"] }, "test", orgCode)
		const header2 = await createHeader({ [`test-*`]: ["finance"], [`uk-*`]: ["finance"] }, "uk", orgCode)
		const header3 = await createHeader({ [`test-*`]: ["finance"], [`uk-*`]: ["finance"] }, "eea", orgCode)
		expect(await pax2pay.Identity.authenticate(header1, constraint, undefined, verifier)).toBeTruthy()
		expect(await pax2pay.Identity.authenticate(header2, constraint, undefined, verifier)).toBeTruthy()
		expect(await pax2pay.Identity.authenticate(header3, constraint, undefined, verifier)).toBeFalsy()
		expect(await pax2pay.Identity.authenticate(header3, constraint, undefined, verifier, "error")).toStrictEqual({
			error: undefined,
			reason: undefined,
			status: 403,
			type: "forbidden",
		})
	})
	it.skip("get realms one realm", async () => {
		const permissionsRealm = pax2pay.Key.Roles.resolve({ [`test-*`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsRealm)).toEqual(["test"])
		const permissionsOrganization = pax2pay.Key.Roles.resolve({ [`test-${orgCode}`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsOrganization)).toEqual(["test"])
	})
	it.skip("get realms several realms", async () => {
		const permissionsRealm = pax2pay.Key.Roles.resolve({ [`test-*`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsRealm)).toEqual(["test"])
		const permissionsOrganization = pax2pay.Key.Roles.resolve({ [`test-${orgCode}`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsOrganization)).toEqual(["test"])
	})
	it.skip("get realms all realms", async () => {
		const permissionsRealm = pax2pay.Key.Roles.resolve({ [`*-*`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsRealm)).toEqual(pax2pay.Realm.realms)
		const permissionsOrganization = pax2pay.Key.Roles.resolve({ [`*-${orgCode}`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsOrganization)).toEqual(pax2pay.Realm.realms)
	})
	it.skip("single realm key inference", async () => {
		const header = await createHeader({ "test-*": ["admin"] }, undefined, undefined)
		const constraint: pax2pay.Key.Permissions = { cards: { view: true } }
		const identity = await pax2pay.Identity.authenticate(header, constraint, { realm: true }, verifier)
		expect(identity?.realm).toEqual("test")
	})
	it("nested collection check", () => {
		const anupam = {
			issuer: "pax2pay",
			issued: "2025-05-27T09:20:13.000Z",
			audience: "dash.pax2pay.app",
			expires: "2025-05-27T21:20:13.000Z",
			email: "anu.pam@pax2pay.dev",
			name: { first: "anu", last: "pam" },
			permissions: {
				"uk-*": {
					organizations: { view: true, rules: true },
					accounts: { view: true },
					transactions: { view: true, comment: true },
					cards: { view: true },
					rules: true,
					treasury: { view: true },
					settlements: { view: true },
				},
				"uk-pax2pay": { user: { read: true } },
			},
			token: "ey",
		}
		const will = {
			issuer: "pax2pay",
			issued: "2025-05-27T12:30:16.000Z",
			audience: "dash.pax2pay.app",
			expires: "2025-05-28T00:30:16.000Z",
			email: "will.bill@pax2pay.dev",
			name: { first: "will", last: "bill" },
			permissions: {
				"uk-*": {
					organizations: { view: true, create: true, rules: true, accounts: true },
					accounts: { view: true, change: true },
					transactions: { view: true, resolve: true, comment: true },
					cards: { view: true },
					treasury: { rebalance: true, view: true },
					settlements: { view: true },
				},
			},
			token: "ey",
		}
		const identityWill = new pax2pay.Identity<pax2pay.Identity.Require>(will as any, undefined, undefined)
		const identityAnupam = new pax2pay.Identity<pax2pay.Identity.Require>(anupam as any, undefined, undefined)
		expect(identityWill.collectionCheck("organizations")).toEqual(true)
		expect(identityWill.collectionCheck("organizations.accounts")).toEqual(true)
		expect(identityAnupam.collectionCheck("organizations")).toEqual(true)
		expect(identityAnupam.collectionCheck("organizations.accounts")).toEqual(false)
	})
})

const privateKey =
	"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNYqpd/DwdTqUy2gt1zVYSQRk/8OaHHwmZ8wxDFxQiIVSQ5sv3MASj+mTj/UUJoDL+XXjJfvo5T3sRqeerwU5uN3y1TlQ6pvif1Glc7eZ3UkMhmS6qGNDC4IlrH/SfI1j5YfkwtYIGCjmTDpH4AcF0JdAZIagwZ+bSpADJIMTU+ZlZz/qxHhZpwr6igw79i0/se5BB4byqwnjjBtBdpiUq6nEmvcQOj5Sfg3388eZeVNPPW7v9o7YpvM/5XqR6+8/N/6ZL4q9IsxgyAi4OJBe+Wiv1R4LUzlU2PtOvHocqeiJ6QpS3e0vXhwgdUqGk5OU3aXbKPgiaYAbepniAw7oPAgMBAAECggEBAMJ9KC+P560pCC67ZBbNty/aDXsLOIHD1me+TGJLvHkFbvs4UvVkt0BAoMF02Kdg2GkfQn4si+8xYK09Y3C1wPuF98YIwqI380AG+S9S6OcdMwzh7dqNXULtNbQHsrHv2xVsvXhuqQ3nKNYk+f0MTJEcLY9e29Ha0i2tuEC9kybI8mvzTHXjEboypN3wYP2m+G2+GrjIeLxLPpGBvTLO9/vzQlahlBwEU3JKFC9/qXT8HymCLAS6k7E6USSEGw2kCYx/TrG0VWXuxpXx86dSwAmgaqp44ykLA89stMjeuFVaKbP+CCuWrlx95sUK7pvQv/xEtT+ThVlRi05Fp2JBzeECgYEA83ejxhzxF+npMvNymMw+NyeYrPwMjGw9hdXHF0um10u9I6KDIn/PMTnVWDa0oQ1rKElrzzD0lWLJw/oDfSP4SH5MhAuX/syWZqJW/hucjPq4Puf+et4Fve2q15L5jVPmwYGqI/Bmy+OaePdnGFr8RfI9Sil2dklkcIEQuv0cFlMCgYEA1/UwtU7kvdR+fDAS7LRx0UmWLTbvux93UzHxqn+XNauma8lZOkKRh6/PJ3emUscMI2PgGFTdn65BwmUj8icVpioXo71/vbmfvFluMjPgbllvhEwFTsZUgkCSx4ivPgh2Pk/VOflT6xu4q1F5NUZpzX/cW1a9fHM93a4V0v9zXdUCgYBCZ6hYub4caqU7S2E/Qb3aZ0diLyDxD/i7zzINLYolALhmxsWDnF6Tq5WACPO9VZ6bj2MDUPP05svnUwKumCf5BdGy1kKvsXd4KOEXT8qkPSIRrk8fjfz8750ATUsZe//dWZNhWAmBpOOWCMyqvO4/2bFTz/lKi/wEH3/DsJN/lwKBgFYhSi3lq0EysMei/Mk/Jm3MJYMe9/nvkM2zi6jufkY/kX5HrbiYuCYfrkUVaVZ2YJb0zHmnz0RSYZPAdterUu0UuJzrhTkMAXNDT7niCs64CMwA7dT/MNFKI8BE+W+KPG6ZtHcMw7VvNvXM5sSisqvtJNug+q3Z4IC7X6TpkP+JAoGAPLqj9DG52nNdY+BwqJLWG5nIZxfWXcYlsr5dwwVYptc4Dont5R63r3Mk8q94+1VC+Vewzfba+y1+kYyK0twdkXNLNDuvHydOXX7LR1L66iEd//rlvWCvuqFkOgnEJk5iPBiF8Z7dFA5+HoHgeBBiF3Na1R3aWiCxnIPbcchRZgQ="
const publicKey =
	"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWKqXfw8HU6lMtoLdc1WEkEZP/Dmhx8JmfMMQxcUIiFUkObL9zAEo/pk4/1FCaAy/l14yX76OU97Eannq8FObjd8tU5UOqb4n9RpXO3md1JDIZkuqhjQwuCJax/0nyNY+WH5MLWCBgo5kw6R+AHBdCXQGSGoMGfm0qQAySDE1PmZWc/6sR4WacK+ooMO/YtP7HuQQeG8qsJ44wbQXaYlKupxJr3EDo+Un4N9/PHmXlTTz1u7/aO2KbzP+V6kevvPzf+mS+KvSLMYMgIuDiQXvlor9UeC1M5VNj7Trx6HKnoiekKUt3tL14cIHVKhpOTlN2l2yj4ImmAG3qZ4gMO6DwIDAQAB"
const orgCode = "paxair"
const verifier = userwidgets.User.Key.Verifier.create<pax2pay.Key>(publicKey)

async function createHeader(
	roles: pax2pay.Key.Roles | undefined,
	realm: pax2pay.Realm | undefined,
	organization: string | undefined
): Promise<pax2pay.Identity.Header> {
	return {
		authorization: roles ? "Bearer " + (await tokenize(roles)) : undefined,
		realm,
		organization,
	}
}

async function tokenize(role: pax2pay.Key.Roles): Promise<string | undefined> {
	const issuer = userwidgets.User.Key.Issuer.create("jest", "all ages", publicKey, privateKey)
	return await issuer.sign({
		...{ name: { first: "", last: "" }, email: "" },
		permissions: flagly.Flags.stringify(pax2pay.Key.Roles.resolve(role)),
	})
}
