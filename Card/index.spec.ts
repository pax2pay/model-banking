import { isoly } from "isoly"
import { pax2pay } from "../index"

const now = isoly.DateTime.now()
const optional: string[] = ["reference", "meta", "number"]
const Card: pax2pay.Card = {
	id: "example",
	created: now,
	realm: "test",
	organization: "example",
	account: "example",
	preset: "p2p-mc-200",
	scheme: "mastercard",
	reference: "example",
	details: {
		iin: "example",
		last4: "example",
		expiry: [24, 12],
		holder: "example",
		token: "example",
	},
	limit: ["GBP", 2000],
	spent: ["GBP", 300],
	status: "active",
	history: [],
	rules: [
		{
			code: "abc",
			name: "example",
			type: "authorization",
			category: "product",
			condition: "",
			action: "flag",
			flags: ["example"],
			description: "flag transactions with example if they exist",
		},
	],
	meta: { a: "example1", b: [{ c: 2 }] },
}
describe("Card", () => {
	describe.each(Object.keys(Card).filter(e => !optional.includes(e)))("is()", remove => {
		test(`is falsy since ${remove} is undefined`, () => {
			expect(pax2pay.Card.is({ ...Card, [remove]: undefined })).toBeFalsy()
		})
	})
	describe.each(["", ...optional])("is()", remove => {
		test(`is truthy even though ${remove} is undefined`, () => {
			delete Card[remove as keyof typeof Card]
			expect(pax2pay.Card.is({ ...Card, [remove]: undefined })).toBeTruthy()
		})
	})
})
