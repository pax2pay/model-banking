import { pax2pay } from "../index"

describe("Password", () => {
	it("hash and verify", async () => {
		const pepper = pax2pay.User.Password.salt()
		const password = "testPassword"
		const hash = await pax2pay.User.Password.hash(password, pepper)
		expect(await pax2pay.User.Password.verify(password, hash, pepper)).toBe(true)
		expect(await pax2pay.User.Password.verify(password + "!", hash, pepper)).toBe(false)
	})
})
