import { flagly } from "flagly"
import { userwidgets } from "@userwidgets/model"
import { pax2pay } from "./index"

describe("Identity", () => {
	it("authenticate with empty constraint", async () => {
		const constraint: pax2pay.Key.Permissions = {}
		expect(await authenticate({ [`test-*`]: ["finance"] }, constraint)).toBeTruthy()
		expect(await authenticate({ [`test-${orgCode}`]: ["finance"] }, constraint)).toBeTruthy()
	})
	it("authenticate finance roll on test", async () => {
		const constraint: pax2pay.Key.Permissions = {
			treasury: { rebalance: true },
		}
		expect(await authenticate({ [`test-*`]: ["finance"] }, constraint, "test", orgCode)).toBeTruthy()
		expect(await authenticate({ [`test-${orgCode}`]: ["finance"] }, constraint, "test", orgCode)).toBeFalsy()
	})
	it("authenticate organization finance roll on test", async () => {
		const constraint: pax2pay.Key.Permissions = {
			cards: { view: true },
		}
		expect(await authenticate({ [`test-${orgCode}`]: ["finance"] }, constraint, "test", orgCode)).toBeTruthy()
	})
	it("authenticate admin", async () => {
		const constraint: pax2pay.Key.Permissions = {
			treasury: { rebalance: true },
		}
		expect(await authenticate({ [`*-*`]: ["admin"] }, constraint, "test", orgCode)).toBeTruthy()
		expect(await authenticate({ [`*-*`]: ["admin"] }, constraint, "testUK", orgCode)).toBeTruthy()
	})
	it("authenticate finance roll on several realms", async () => {
		const constraint: pax2pay.Key.Permissions = {
			treasury: { rebalance: true },
		}
		const roles: pax2pay.Key.Roles = {
			[`test-*`]: ["finance"],
			[`testUK-*`]: ["finance"],
		}
		expect(await authenticate(roles, constraint, "test", orgCode)).toBeTruthy()
		expect(await authenticate(roles, constraint, "testUK", orgCode)).toBeTruthy()
		expect(await authenticate(roles, constraint, "eu", orgCode)).toBeFalsy()
	})
	it("get realms one realm", async () => {
		const permissionsRealm = pax2pay.Key.Roles.resolve({ [`test-*`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsRealm)).toEqual(["test"])
		const permissionsOrganization = pax2pay.Key.Roles.resolve({ [`test-${orgCode}`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsOrganization)).toEqual(["test"])
	})
	it("get realms several realms", async () => {
		const permissionsRealm = pax2pay.Key.Roles.resolve({ [`test-*`]: ["finance"], [`testUK-*`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsRealm)).toEqual(["test", "testUK"])
		const permissionsOrganization = pax2pay.Key.Roles.resolve({
			[`test-${orgCode}`]: ["finance"],
			[`testUK-${orgCode}`]: ["finance"],
		})
		expect(pax2pay.Identity.getRealms(permissionsOrganization)).toEqual(["test", "testUK"])
	})
	it("get realms all realms", async () => {
		const permissionsRealm = pax2pay.Key.Roles.resolve({ [`*-*`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsRealm)).toEqual(pax2pay.Realm.realms)
		const permissionsOrganization = pax2pay.Key.Roles.resolve({ [`*-${orgCode}`]: ["finance"] })
		expect(pax2pay.Identity.getRealms(permissionsOrganization)).toEqual(pax2pay.Realm.realms)
	})
	it("aaaa", async () => {
		const key =
			"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXgycGF5IiwiaWF0IjoxNzA1NDMwMTEzLCJhdWQiOiJkYXNoLnBheDJwYXkuYXBwIiwiZXhwIjoxNzA1NDczMzEzLCJzdWIiOiJ0ZXN0LnRlc3Rzc29uQHRlc3RhYi50ZXN0IiwibmFtIjp7ImZpcnN0IjoidGVzdCIsImxhc3QiOiJ0ZXN0c3NvbiJ9LCJwZXIiOiJ0ZXN0LSouY2FyZHMudmlldyJ9.qmnqUKjCDRiep8Vcz8eGM-iL0jGPTiZOwottprvSw7SOZX37nBQ_W27kzEfwTPRiYtaJ2YAFQ3q2QOQzaCV9gYZHDvSk9HZki80L7mIP3cqcxq4BkcAVq5m3N2xcOV-k0YfYJOBwOrWkpBpEOs6SiimlIOloEPZU5I2NyirJDtu1sHURdR071t8yWdNSOspANN-3JU6xqBDaV4jFpoXUb9nf9TgKUHEe7zsySUsujtXcJNU1d9sprS9nb4r_bDKEe4BRt42vymBaP3NuXGmPpEk4h_pMUto6TFL93PHCXnXlaDW3XbWDTRGTBu-dJr580e97I6V9TIfun_oDv33iltzVbQUTzR2uPkF7mhb2jUW7Uvwq6FqeglWErtzJpyrHYYaB_xssGH1prKcTotrK4zxjA3MUl4ra12kMmR6wSHZTCO1uOJXCgM3O19FjWe1L1znCb6sFdugDUWkJSy5T-pA7gacSqPQ2WTHTRS0HUU2Z5vosSG6ugRJLjdSEfjOP80AdTxjyZWkHhpSpgvnffF8lQjId2j38NEV1HaXMkyafG6yO9b8sYcFch7omzab8FjscGrrypv9hGb8l1cOwApHPDyDOkAaDy20lLk9O9cl_cxSBTrm7IRG11aolGk-yF4P1-xe-57QHZZSjwR1izARahuqmSDbioY0ntnBJqho"
		const identity = await pax2pay.Identity.authenticate({ authorization: "Bearer " + key }, { cards: { view: true } })
		console.log("identity: ", identity)
		expect(identity?.realm).toEqual("test")
	})
})
const privateKey =
	"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNYqpd/DwdTqUy2gt1zVYSQRk/8OaHHwmZ8wxDFxQiIVSQ5sv3MASj+mTj/UUJoDL+XXjJfvo5T3sRqeerwU5uN3y1TlQ6pvif1Glc7eZ3UkMhmS6qGNDC4IlrH/SfI1j5YfkwtYIGCjmTDpH4AcF0JdAZIagwZ+bSpADJIMTU+ZlZz/qxHhZpwr6igw79i0/se5BB4byqwnjjBtBdpiUq6nEmvcQOj5Sfg3388eZeVNPPW7v9o7YpvM/5XqR6+8/N/6ZL4q9IsxgyAi4OJBe+Wiv1R4LUzlU2PtOvHocqeiJ6QpS3e0vXhwgdUqGk5OU3aXbKPgiaYAbepniAw7oPAgMBAAECggEBAMJ9KC+P560pCC67ZBbNty/aDXsLOIHD1me+TGJLvHkFbvs4UvVkt0BAoMF02Kdg2GkfQn4si+8xYK09Y3C1wPuF98YIwqI380AG+S9S6OcdMwzh7dqNXULtNbQHsrHv2xVsvXhuqQ3nKNYk+f0MTJEcLY9e29Ha0i2tuEC9kybI8mvzTHXjEboypN3wYP2m+G2+GrjIeLxLPpGBvTLO9/vzQlahlBwEU3JKFC9/qXT8HymCLAS6k7E6USSEGw2kCYx/TrG0VWXuxpXx86dSwAmgaqp44ykLA89stMjeuFVaKbP+CCuWrlx95sUK7pvQv/xEtT+ThVlRi05Fp2JBzeECgYEA83ejxhzxF+npMvNymMw+NyeYrPwMjGw9hdXHF0um10u9I6KDIn/PMTnVWDa0oQ1rKElrzzD0lWLJw/oDfSP4SH5MhAuX/syWZqJW/hucjPq4Puf+et4Fve2q15L5jVPmwYGqI/Bmy+OaePdnGFr8RfI9Sil2dklkcIEQuv0cFlMCgYEA1/UwtU7kvdR+fDAS7LRx0UmWLTbvux93UzHxqn+XNauma8lZOkKRh6/PJ3emUscMI2PgGFTdn65BwmUj8icVpioXo71/vbmfvFluMjPgbllvhEwFTsZUgkCSx4ivPgh2Pk/VOflT6xu4q1F5NUZpzX/cW1a9fHM93a4V0v9zXdUCgYBCZ6hYub4caqU7S2E/Qb3aZ0diLyDxD/i7zzINLYolALhmxsWDnF6Tq5WACPO9VZ6bj2MDUPP05svnUwKumCf5BdGy1kKvsXd4KOEXT8qkPSIRrk8fjfz8750ATUsZe//dWZNhWAmBpOOWCMyqvO4/2bFTz/lKi/wEH3/DsJN/lwKBgFYhSi3lq0EysMei/Mk/Jm3MJYMe9/nvkM2zi6jufkY/kX5HrbiYuCYfrkUVaVZ2YJb0zHmnz0RSYZPAdterUu0UuJzrhTkMAXNDT7niCs64CMwA7dT/MNFKI8BE+W+KPG6ZtHcMw7VvNvXM5sSisqvtJNug+q3Z4IC7X6TpkP+JAoGAPLqj9DG52nNdY+BwqJLWG5nIZxfWXcYlsr5dwwVYptc4Dont5R63r3Mk8q94+1VC+Vewzfba+y1+kYyK0twdkXNLNDuvHydOXX7LR1L66iEd//rlvWCvuqFkOgnEJk5iPBiF8Z7dFA5+HoHgeBBiF3Na1R3aWiCxnIPbcchRZgQ="
const publicKey =
	"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWKqXfw8HU6lMtoLdc1WEkEZP/Dmhx8JmfMMQxcUIiFUkObL9zAEo/pk4/1FCaAy/l14yX76OU97Eannq8FObjd8tU5UOqb4n9RpXO3md1JDIZkuqhjQwuCJax/0nyNY+WH5MLWCBgo5kw6R+AHBdCXQGSGoMGfm0qQAySDE1PmZWc/6sR4WacK+ooMO/YtP7HuQQeG8qsJ44wbQXaYlKupxJr3EDo+Un4N9/PHmXlTTz1u7/aO2KbzP+V6kevvPzf+mS+KvSLMYMgIuDiQXvlor9UeC1M5VNj7Trx6HKnoiekKUt3tL14cIHVKhpOTlN2l2yj4ImmAG3qZ4gMO6DwIDAQAB"
const orgCode = "paxair"
async function authenticate(
	roles: pax2pay.Key.Roles,
	constraint: pax2pay.Key.Permissions,
	realm?: pax2pay.Realm,
	organization?: string
): Promise<pax2pay.Identity | undefined> {
	const header = {
		authorization: "Bearer " + (await tokenize(roles)),
		realm,
		organization,
	}
	const verifier = userwidgets.User.Key.Verifier.create<pax2pay.Key>(publicKey)
	return await pax2pay.Identity.authenticate(header, constraint, verifier)
}
async function tokenize(role: pax2pay.Key.Roles): Promise<string | undefined> {
	const issuer = userwidgets.User.Key.Issuer.create("jest", "all ages", publicKey, privateKey)
	return await issuer.sign({
		...{ name: { first: "", last: "" }, email: "", permissions: "" },
		permissions: flagly.Flags.stringify(pax2pay.Key.Roles.resolve(role)),
	})
}
