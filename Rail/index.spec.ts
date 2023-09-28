import { pax2pay } from "../index"

describe("Rail", () => {
	it("compare", () => {
		expect(pax2pay.Rail.compare([{ ...iban1 }, { ...iban1 }])).toBeTruthy()
		expect(pax2pay.Rail.compare([{ ...iban2 }, { ...iban2 }])).toBeTruthy()
		expect(pax2pay.Rail.compare([{ ...scan1 }, { ...scan1 }])).toBeTruthy()
		expect(pax2pay.Rail.compare([{ ...scan2 }, { ...scan2 }])).toBeTruthy()
		expect(pax2pay.Rail.compare([{ ...card1 }, { ...card1 }])).toBeTruthy()
		expect(pax2pay.Rail.compare([{ ...card2 }, { ...card2 }])).toBeTruthy()
		expect(pax2pay.Rail.compare([{ ...scan1 }, { ...iban1 }])).toBeFalsy()
		expect(pax2pay.Rail.compare([{ ...scan1 }, { ...scan2 }])).toBeFalsy()
		expect(pax2pay.Rail.compare([{ ...iban1 }, { ...iban2 }])).toBeFalsy()
		expect(pax2pay.Rail.compare([{ ...card1 }, { ...card2 }])).toBeFalsy()
		expect(pax2pay.Rail.compare([{ ...card1 }, { ...iban2 }])).toBeFalsy()
		expect(pax2pay.Rail.compare([{ ...card1 }, { ...scan2 }])).toBeFalsy()
	})
})
const iban1: pax2pay.Rail.Iban = {
	holder: "Janne",
	type: "iban",
	iban: "ivan",
}

const iban2: pax2pay.Rail.Iban = {
	holder: "Boose",
	type: "iban",
	iban: "ivan2",
}
const scan1: pax2pay.Rail.Scan = {
	holder: "Janne",
	type: "scan",
	sort: "scan1",
	account: "account1",
}

const scan2: pax2pay.Rail.Scan = {
	holder: "Boose",
	type: "scan",
	sort: "scan2",
	account: "account2",
}
const card1: pax2pay.Rail.Card = {
	type: "card",
	scheme: "mastercard",
	id: "abcdefgh12345678",
	iin: "123456",
	last4: "1234",
	expiry: [23, 12],
	holder: "Janne",
	merchant: {
		name: "Ink inc",
		id: "string",
		category: "string",
		address: "string",
		city: "string",
		zip: "string",
		country: "SE",
	},
	acquirer: {
		id: "string",
		number: "string",
	},
}

const card2: pax2pay.Rail.Card = {
	...card1,
	expiry: [23, 11],
}
