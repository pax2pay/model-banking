import { pax2pay } from "../index"

describe("User", () => {
	it("should verify that true is true", () => {
		expect(pax2pay.User.Invite.Creatable.type.is(creatable)).toBe(true)
	})
})
const creatable = { email: "daw", access: {} }
