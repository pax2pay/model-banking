import { pax2pay } from "../index"

// cSpell:disable
const optional: string[] = ["meta", "rules", "number"]
const Creatable: pax2pay.Card.Creatable = {
	account: "example",
	preset: "p2p-mc-200",
	details: {
		expiry: [24, 12],
		holder: "example examplesson",
	},
	limit: ["GBP", 2000],
	rules: [
		{
			name: "example",
			type: "authorization",
			condition: "",
			action: "flag",
			flags: ["example"],
			description: "flag transactions with example if they exist",
		},
	],
	meta: { a: "example1", b: [{ c: 2 }] },
}
describe("Card.Creatable", () => {
	describe.each(Object.keys(Creatable).filter(e => !optional.includes(e)))("is()", remove => {
		test(`is falsy since ${remove} is undefined`, () => {
			expect(pax2pay.Card.Creatable.is({ ...Creatable, [remove]: undefined })).toBeFalsy()
		})
	})
	describe.each(["", ...optional])("is()", remove => {
		test(`is truthy even though ${remove} is undefined`, () => {
			delete Creatable[remove as keyof typeof Creatable]
			expect(pax2pay.Card.Creatable.is({ ...Creatable, [remove]: undefined })).toBeTruthy()
		})
	})
})
