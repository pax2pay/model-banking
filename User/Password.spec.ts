import { Password } from "./Password"

describe("Password", () => {
	it("hash and verify", async () => {
		const pepper = Password.salt()
		const password = "testPassword"
		const hash = await Password.hash(password, pepper)
		expect(await Password.verify(password, hash, pepper)).toBe(true)
		expect(await Password.verify(password + "!", hash, pepper)).toBe(false)
	})
})
