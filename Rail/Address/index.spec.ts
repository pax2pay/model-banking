import { pax2pay } from "../../index"

describe("Rail.Address", () => {
	it("compare", () => {
		expect(pax2pay.Rail.Address.compare([{ ...iban1 }, { ...iban1 }])).toBeTruthy()
		expect(pax2pay.Rail.Address.compare([{ ...iban2 }, { ...iban2 }])).toBeTruthy()
		expect(pax2pay.Rail.Address.compare([{ ...scan1 }, { ...scan1 }])).toBeTruthy()
		expect(pax2pay.Rail.Address.compare([{ ...scan2 }, { ...scan2 }])).toBeTruthy()
		expect(pax2pay.Rail.Address.compare([{ ...card1 }, { ...card1 }])).toBeTruthy()
		expect(pax2pay.Rail.Address.compare([{ ...card2 }, { ...card2 }])).toBeTruthy()
		expect(pax2pay.Rail.Address.compare([{ ...scan1 }, { ...iban1 }])).toBeFalsy()
		expect(pax2pay.Rail.Address.compare([{ ...scan1 }, { ...scan2 }])).toBeFalsy()
		expect(pax2pay.Rail.Address.compare([{ ...iban1 }, { ...iban2 }])).toBeFalsy()
		expect(pax2pay.Rail.Address.compare([{ ...card1 }, { ...card2 }])).toBeFalsy()
		expect(pax2pay.Rail.Address.compare([{ ...card1 }, { ...iban2 }])).toBeFalsy()
		expect(pax2pay.Rail.Address.compare([{ ...card1 }, { ...scan2 }])).toBeFalsy()
		expect(pax2pay.Rail.Address.compare([{ ...paxgiro }, { ...scan2 }])).toBeFalsy()
		expect(pax2pay.Rail.Address.compare([{ ...paxgiro }, { ...internal }])).toBeFalsy()
	})
})
const internal: pax2pay.Rail.Address.Internal = { type: "internal", identifier: "aaaaa" }
const paxgiro: pax2pay.Rail.Address.PaxGiro = { type: "paxgiro", identifier: "aaaaa" }
const iban1: pax2pay.Rail.Address.Iban = {
	holder: "Janne",
	type: "iban",
	iban: "ivan",
}
const iban2: pax2pay.Rail.Address.Iban = {
	holder: "Boose",
	type: "iban",
	iban: "ivan2",
}
const scan1: pax2pay.Rail.Address.Scan = {
	holder: "Janne",
	type: "scan",
	sort: "scan1",
	account: "account1",
}
const scan2: pax2pay.Rail.Address.Scan = {
	holder: "Boose",
	type: "scan",
	sort: "scan2",
	account: "account2",
}
const card1: pax2pay.Rail.Address.Card = {
	type: "card",
	scheme: "mastercard",
	id: "abcdefgh12345678",
	iin: "123456",
	last4: "1234",
	expiry: [23, 12],
	holder: "Janne",
}
const card2: pax2pay.Rail.Address.Card = {
	...card1,
	expiry: [23, 11],
}
