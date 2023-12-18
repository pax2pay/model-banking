import { pax2pay } from "../../index"

describe("Address", () => {
	it("countryCode determines type", () => {
		expect(pax2pay.Organization.Contact.is(contact)).toBeTruthy()
		expect(pax2pay.Organization.Contact.is(mistyped1)).toBeFalsy()
		expect(pax2pay.Organization.Contact.is(mistyped2)).toBeFalsy()
	})
})

const mistyped1 = {
	name: { first: "Test", last: "Testsson" },
	email: "@test.com",
	phone: { code: "+46", number: "1245667" },
	address: {
		primary: {
			countryCode: "GB",
			building: "asdf",
			city: "qwer",
			street: "zxcv",
			zipCode: "11235",
		},
	},
}

const mistyped2 = {
	name: { first: "Test", last: "Testsson" },
	email: "test@test.com",
	phone: { code: "+46", number: "12m45667" },
	address: {
		primary: {
			countryCode: "GB",
			building: "asdf",
			city: "qwer",
			street: "zxcv",
			zipCode: "11235",
		},
	},
}

const contact = {
	name: { first: "Test", last: "Testsson" },
	email: "test123@test.com",
	phone: { code: "+46", number: "1245667" },
	address: {
		primary: {
			countryCode: "GB",
			building: "asdf",
			city: "qwer",
			street: "zxcv",
			zipCode: "11235",
		},
	},
}
