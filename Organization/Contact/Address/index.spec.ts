import { pax2pay } from "../../../index"

describe("Address", () => {
	it("countryCode determines type", () => {
		expect(address1.countryCode == "GB" && address1.building).toBeTruthy()
	})
})

const address1: pax2pay.Organization.Contact.Address = {
	countryCode: "GB",
	building: "asdf",
	city: "qwer",
	street: "zxcv",
	zipCode: "11235",
}
