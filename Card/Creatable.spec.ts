import { pax2pay } from "../index"

const optional: string[] = ["meta", "rules", "number"]
const Creatable: pax2pay.Card.Creatable = {
	account: "example",
	preset: "example1",
	details: {
		iin: "example",
		expiry: [2024, 12],
		holder: "example examplesson",
	},
	limit: ["GBP", 2000],
	rules: ["example"],
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
