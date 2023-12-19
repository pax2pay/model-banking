import { pax2pay } from "../../index"

describe("Organization.Contact", () => {
	it("is to succeed", () => {
		expect(pax2pay.Organization.Contact.is(contact)).toBeTruthy()
	})
	it("wrong phone number", () => {
		const mistyped = { ...contact, phone: { ...contact.phone, number: "12m45667" } }
		expect(pax2pay.Organization.Contact.is(mistyped)).toBeFalsy()
	})
	it("wrong email", () => {
		const mistyped = { ...contact, email: "this.is.not.an.email" }
		expect(pax2pay.Organization.Contact.is(mistyped)).toBeFalsy()
	})
})

const contact = {
	name: { first: "Test", last: "Testsson" },
	email: "test123@test.com",
	phone: { code: "+46", number: "1245667" },
	address: {
		primary: {
			countryCode: "SE",
			city: "qwer",
			street: "zxcv",
			zipCode: "11235",
			county: "land",
		},
	},
}
