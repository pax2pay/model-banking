import { isoly } from "isoly"
import "jest"
import { pax2pay } from "./index"

describe("library", () => {
	it("scan from iban", () => {
		expect(
			pax2pay.Rail.Scan.is(pax2pay.Rail.Scan.fromIban({ type: "iban", iban: "GB19CLRB04081800000011", holder: "ACME" }))
		).toEqual(true)
	})
	const body = {
		account: {
			type: "iban",
			iban: "GB54CLRB04081800000157",
			holder: "",
		},
		counterpart: {
			type: "iban",
			iban: "GB26CLRB04081800000176",
			holder: "",
		},
		reference: {
			supplier: "clearbank",
			reference: "LghIz_9W",
			endToEndId: "LghIz_9W",
			returnId: "82614c2b-87be-494a-a7ae-9445c8142936",
		},
		currency: "GBP",
		amount: 201,
		posted: "2023-05-17T07:24:16.72Z",
		description: "Outgoing transaction returned by scheme. Old description: internal reversal .",
	}
	it("a", () => {
		expect(true).toEqual(true)
	})
	it("incoming is", () => {
		expect(pax2pay.Transaction.Incoming.is(body)).toBeTruthy()
	})
	it("DateTime is", () => {
		expect(isoly.DateTime.is("2023-05-17T07:24:16.72Z")).toBeFalsy()
	})
	it("transaction is", () => {
		const transaction: pax2pay.Transaction = {
			account: "6gpfb4Bf",
			method: {
				type: "card",
				id: "zzzzztg7nZQko17R",
				scheme: "mastercard",
				expiry: [23, 12],
				holder: "Card Holden",
				iin: "111111",
				last4: "1234",
			},
			counterpart: {
				type: "card",
				merchant: {
					name: "Merchant",
					id: "abcd1234",
					category: "4511",
					country: "KP",
					city: "upcheck town",
					zip: "12345",
					address: "Streetname 1, 12345 Towncity",
				},
				acquirer: {
					id: "2345erty",
					number: "1351858913568",
					country: "GB",
				},
			},
			amount: -1,
			balance: 6993,
			currency: "GBP",
			description: "test",
			id: "V1uV3dB8",
			flags: [],
			notes: [],
			operations: [
				{
					id: "g7NWpbFl",
					created: "2023-03-17T12:26:10.575Z",
					currency: "GBP",
					change: {
						outgoingReserved: { amount: 1, result: 1, status: "success", type: "add" },
					},
					counter: 1,
					account: "12230000",
				},
				{
					id: "hiwWqILu",
					created: "2023-03-17T12:27:08.608Z",
					currency: "GBP",
					change: {
						actual: { amount: 1, result: 6993, status: "success", type: "subtract" },
						outgoingReserved: { amount: 1, result: 0, status: "success", type: "subtract" },
					},
					counter: 2,
					account: "12230000",
				},
			],
			organization: "RBhssR36",
			posted: "2023-03-17T12:26:10.575Z",
			status: "finalized",
			transacted: "2023-03-17T12:27:08.624Z",
		}
		expect(pax2pay.Transaction.is(transaction)).toBeTruthy()
	})
})
