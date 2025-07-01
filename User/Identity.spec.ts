import { gracely } from "gracely"
import { pax2pay } from "../index"

let jwt: pax2pay.User.JWT
describe("Identity", () => {
	beforeAll(async () => {
		jwt = pax2pay.User.JWT.open(key)
	})
	it("Identifies a user from a jwt", async () => {
		const token = await jwt.sign?.({
			permission: { test: { card: "read", account: "write", organization: "developer", transaction: "admin" } },
			realm: "test",
			sub: "Test",
		})
		const identity = await pax2pay.User.Identity.open({ authorization: `Bearer ${token}` }, whitelist, key.public)
		if (!gracely.Error.is(identity)) {
			expect(identity.authenticate({ card: "read" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ card: "write" })).haveOwnProperty("status", 403)
			expect(identity.authenticate({ card: "developer" })).haveOwnProperty("status", 403)
			expect(identity.authenticate({ card: "admin" })).haveOwnProperty("status", 403)
			expect(identity.authenticate({ account: "read" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ account: "write" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ account: "developer" })).haveOwnProperty("status", 403)
			expect(identity.authenticate({ account: "admin" })).haveOwnProperty("status", 403)
			expect(identity.authenticate({ organization: "read" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ organization: "write" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ organization: "developer" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ organization: "admin" })).haveOwnProperty("status", 403)
			expect(identity.authenticate({ transaction: "read" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ transaction: "write" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ transaction: "developer" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ transaction: "admin" })).instanceOf(pax2pay.User.Identity)
			expect(identity.authenticate({ settlement: "read" })).haveOwnProperty("status", 403)
			expect(identity.authenticate({ settlement: "write" })).haveOwnProperty("status", 403)
			expect(identity.authenticate({ settlement: "developer" })).haveOwnProperty("status", 403)
			expect(identity.authenticate({ settlement: "admin" })).haveOwnProperty("status", 403)
		}
		// This is to make the test fail if the identity cannot be created
		else
			expect(identity).instanceOf(pax2pay.User.Identity)
	})
	it("Identifies a user from a whitelisted long term jwt", async () => {
		const identity = await pax2pay.User.Identity.open(
			{ authorization: `Bearer ${whitelisted.token}` },
			whitelist,
			key.public
		)
		expect(identity).instanceOf(pax2pay.User.Identity)
	})
	it("Identifies a user from a non whitelisted long term jwt", async () => {
		const identity = await pax2pay.User.Identity.open(
			{ authorization: `Bearer ${nonWhitelisted.token}` },
			whitelist,
			key.public
		)
		expect(identity).haveOwnProperty("status", 401)
	})
})
const key = {
	public:
		"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRkP7wOUeOjevJnHuAGH39TqxhiArpuD/RbOb23cg3+v2kEGiI5HtTecivd5dbtGu41SWkTCnFis3rxQK8G1+6A1K7ibeAdkRSrpM9cZKo+nmfqdmn47TVBS4G6P0BLUvw6hgKltX9mqCPpLRGv/fDEjCd04VpKNbjsqg5x+1LwwIDAQAB",
	private:
		"MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBANGQ/vA5R46N68mce4AYff1OrGGICum4P9Fs5vbdyDf6/aQQaIjke1N5yK93l1u0a7jVJaRMKcWKzevFArwbX7oDUruJt4B2RFKukz1xkqj6eZ+p2afjtNUFLgbo/QEtS/DqGAqW1f2aoI+ktEa/98MSMJ3ThWko1uOyqDnH7UvDAgMBAAECgYBInbqJGP//mJPMb4mn0FTP0lQPE6ncZLjQY7EAd8cqBrGfCQR/8tP9D+UHUCRFZZYyHMGHVdDfn4JNIR4aek3HsVdCMWKBcfAP4dZ9mgZyQnQHEUyeaV3D5MwpcEaQ60URgNAtBqD+hExBTcwdNHV89jCOsmKsF07mc0Rce8r4kQJBAOsrN6XHQgMAAGeLzLN6XUu2Lc7PcGFulcETbnEFmS/vnFEmDp7QcYmeZR2Nh0oXvcrVNJHNnC5YluvWbAhP2okCQQDkITUhJ5L1nJGn3ysGLKEIPAnBqBDGWbZ46uWGvtAwP1a0838k95blhQF7bDOCmxelbMjDQ4womaxzAaY+9jDrAkBEhPAOzlLOevajNNlsxc9fGvKX2lr9GHJrshSwu5fZnq/l+PezkDo0hcEibjUoAmjbK2nIvaau3kMC7hPGDDY5AkADfAJcvEcBW1/aKY11ra7T+l7Hx3JiJTKlTCkvUrDJW95OKz3w6ZszbEGmifOLdiT5UN0MJnb4k8hPhWHtqkL7AkBhZ27YxBXJNQJQjr6spZhXgP2ayBhaRB+6JKVTfcJQpDQyXIIRlBZS1HQBesn8ZIk69t9n6NJTAhRv0QWILFXe",
}
export const whitelist: pax2pay.User.JWT.Whitelist = {
	test: [
		{
			aud: "https://banking.pax2pay.app",
			iat: 1751283567,
			// cSpell:disable-next-line
			id: "UUwLn9rhcf8AoRuG",
			iss: "pax2pay",
			permission: {},
			realm: "test",
			sub: "Test",
		},
	],
}
export const whitelisted = {
	aud: "https://banking.pax2pay.app",
	iat: 1751283567,
	// cSpell:disable-next-line
	id: "UUwLn9rhcf8AoRuG",
	iss: "pax2pay",
	permission: {},
	realm: "test",
	sub: "Test",
	token:
		// cSpell:disable-next-line
		"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXgycGF5IiwiaWF0IjoxNzUxMjgzNTY3LCJhdWQiOiJodHRwczovL2JhbmtpbmcucGF4MnBheS5hcHAiLCJpZCI6IlVVd0xuOXJoY2Y4QW9SdUciLCJwZXJtaXNzaW9uIjp7fSwicmVhbG0iOiJ0ZXN0Iiwic3ViIjoiVGVzdCJ9.z9on0GDa-IO_gBGeuQvX9OP0Vjk56Z0kzeCe6rWaujH5oNLyDFgsQntWZD_grHS9JCSSGUhgis_AbddbsnfPOxOc30Aw90Tl77euoAfICsO0g00NbvqtrJCvDUfGF5z18ENRkPHYkqLirF9-6Y9VVMlAOPZlMOS7kzLRbz1YMe0",
}
export const nonWhitelisted = {
	aud: "https://banking.pax2pay.app",
	iat: 1751285772,
	// cSpell:disable-next-line
	id: "DqZYjzvCHE0Aa1xl",
	iss: "pax2pay",
	permission: {},
	realm: "test",
	sub: "Test",
	token:
		// cSpell:disable-next-line
		"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXgycGF5IiwiaWF0IjoxNzUxMjg1NzcyLCJhdWQiOiJodHRwczovL2JhbmtpbmcucGF4MnBheS5hcHAiLCJpZCI6IkRxWllqenZDSEUwQWExeGwiLCJwZXJtaXNzaW9uIjp7fSwicmVhbG0iOiJ0ZXN0Iiwic3ViIjoiVGVzdCJ9.fi8tXCZJ1HdL59wbnKq5wjRLI7Uzxv8iMPDbybBo9wBu1CHrr9lCqGC7syEz2vxhZD0bae2tX6D0De6gKEbNKmTyd4hFl-Y7IKkuQ6dINFNYnV9as7e1kGIeDrBQdPzFYWX-3O2m3K1vQLME8iD5RpeAkuyJU1dIvzWvet_nqKc",
}
