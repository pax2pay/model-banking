import { JWT } from "."

describe("JWT", () => {
	it("signs a token and verifies", async () => {
		const token = await jwt?.sign?.({ permission: "", realm: "test", sub: "Test" })
		expect(token && (await jwt.verify(token))).toBeTruthy()
	})
	it("verifies a whitelisted token", async () => {
		expect(await jwt.verify(whitelisted.token)).toBeTruthy()
	})
	it("doesn't verify a non whitelisted token", async () => {
		expect(await jwt.verify(nonWhitelisted.token)).toBeFalsy()
	})
	it("verifies a short term token", async () => {
		expect(await jwt.verify(shortTerm.token)).toBeTruthy()
	})
	it("unpacks a whitelisted token", async () => {
		expect(await jwt.unpack(whitelisted.token)).toBeTruthy()
	})
	it("unpacks a non Whitelisted token", async () => {
		expect(await jwt.unpack(nonWhitelisted.token)).toBeTruthy()
	})
	it("unpacks a short term token", async () => {
		expect(await jwt.unpack(shortTerm.token)).toBeTruthy()
	})
})
const key = {
	public:
		"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRkP7wOUeOjevJnHuAGH39TqxhiArpuD/RbOb23cg3+v2kEGiI5HtTecivd5dbtGu41SWkTCnFis3rxQK8G1+6A1K7ibeAdkRSrpM9cZKo+nmfqdmn47TVBS4G6P0BLUvw6hgKltX9mqCPpLRGv/fDEjCd04VpKNbjsqg5x+1LwwIDAQAB",
	private:
		"MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBANGQ/vA5R46N68mce4AYff1OrGGICum4P9Fs5vbdyDf6/aQQaIjke1N5yK93l1u0a7jVJaRMKcWKzevFArwbX7oDUruJt4B2RFKukz1xkqj6eZ+p2afjtNUFLgbo/QEtS/DqGAqW1f2aoI+ktEa/98MSMJ3ThWko1uOyqDnH7UvDAgMBAAECgYBInbqJGP//mJPMb4mn0FTP0lQPE6ncZLjQY7EAd8cqBrGfCQR/8tP9D+UHUCRFZZYyHMGHVdDfn4JNIR4aek3HsVdCMWKBcfAP4dZ9mgZyQnQHEUyeaV3D5MwpcEaQ60URgNAtBqD+hExBTcwdNHV89jCOsmKsF07mc0Rce8r4kQJBAOsrN6XHQgMAAGeLzLN6XUu2Lc7PcGFulcETbnEFmS/vnFEmDp7QcYmeZR2Nh0oXvcrVNJHNnC5YluvWbAhP2okCQQDkITUhJ5L1nJGn3ysGLKEIPAnBqBDGWbZ46uWGvtAwP1a0838k95blhQF7bDOCmxelbMjDQ4womaxzAaY+9jDrAkBEhPAOzlLOevajNNlsxc9fGvKX2lr9GHJrshSwu5fZnq/l+PezkDo0hcEibjUoAmjbK2nIvaau3kMC7hPGDDY5AkADfAJcvEcBW1/aKY11ra7T+l7Hx3JiJTKlTCkvUrDJW95OKz3w6ZszbEGmifOLdiT5UN0MJnb4k8hPhWHtqkL7AkBhZ27YxBXJNQJQjr6spZhXgP2ayBhaRB+6JKVTfcJQpDQyXIIRlBZS1HQBesn8ZIk69t9n6NJTAhRv0QWILFXe",
}
const jwt = JWT.open(key)
export const whitelisted = {
	aud: "https://banking.pax2pay.app",
	iat: 1751272490,
	id: "OL68eAb3YmWAG-gO",
	iss: "pax2pay",
	permission: "",
	realm: "test",
	sub: "Test",
	token:
		// cSpell:disable-next-line
		"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXgycGF5IiwiaWF0IjoxNzUxMjcyNDkwLCJhdWQiOiJodHRwczovL2JhbmtpbmcucGF4MnBheS5hcHAiLCJpZCI6Ik9MNjhlQWIzWW1XQUctZ08iLCJwZXJtaXNzaW9uIjoiIiwicmVhbG0iOiJlZWEiLCJzdWIiOiJUZXN0In0.Sj-9fkFwv4OSIgg1dNuvC19psfdBLvlX0uRGFPTbIXtRPv045HoEB3cmTsHMva--4iv5mk9hteUdbNAfyrtQYFGmS1uutHyOFGJFx_G7gX1Yoj01PvskxXy_mfuT8P2GxdmAfDKUZn6g_f0b0sarTeLoFPWAx5VkMLUBbgeVEtE",
}

export const nonWhitelisted = {
	aud: "https://banking.pax2pay.app",
	iat: 1751272517,
	id: "aBEzQ7mf0HSimQ_g",
	iss: "pax2pay",
	permission: "",
	realm: "test",
	sub: "Test",
	token:
		// cSpell:disable-next-line
		"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXgycGF5IiwiaWF0IjoxNzUxMjcyNTE3LCJhdWQiOiJodHRwczovL2JhbmtpbmcucGF4MnBheS5hcHAiLCJpZCI6ImFCRXpRN21mMEhTaW1RX2ciLCJwZXJtaXNzaW9uIjoiIiwicmVhbG0iOiJlZWEiLCJzdWIiOiJUZXN0In0.Sl-Va2xbimgU0RFYNcDZ_295a-x36tJpK3muYc7n0VB7XeLIxXm9kVbphf6rAtde2qtWYrPIZ80AztRK8htr8occTVqkpczldoXnW4ReJd2SAS9rvkncxqBvmyq-yNznTGGMTR7HDWFyczsAWBAmcDpJnpTj0wFf2J_-uKSCCbs",
}
export const shortTerm = {
	aud: "https://banking.pax2pay.app",
	exp: 1751315789,
	iat: 1751272589,
	iss: "pax2pay",
	permission: "",
	realm: "test",
	sub: "Test",
	token:
		// cSpell:disable-next-line
		"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYXgycGF5IiwiaWF0IjoxNzUxMjcyNTg5LCJhdWQiOiJodHRwczovL2JhbmtpbmcucGF4MnBheS5hcHAiLCJleHAiOjE3NTEzMTU3ODksInBlcm1pc3Npb24iOiIiLCJyZWFsbSI6ImVlYSIsInN1YiI6IlRlc3QifQ.DZMlvalv8ITEhKAjlppcEo1XndRRecONXUbokOKdnUkxzKv59rZVIxC2HfPHIQqRzU7jT0poMDcKIuuz8zzRpLYiC9_MPGw72w-rqQw-61v3O_U-gnp6dLXRpfhY54LEgZVLTk1xr6SGTBZ1WkfXiWWvurk2A-r78Aypkg4IYyM",
}
