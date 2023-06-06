import { pax2pay } from "../index"

const exampleString = "exampleString"
const exampleNumber = 42
const exampleBoolean = true
const exampleObject = {
	exampleString,
	exampleNumber,
	exampleBoolean,
	exampleArray: [exampleString, exampleNumber, exampleBoolean],
}
const exampleArray = [[exampleString, 42], [exampleObject]]
const meta: pax2pay.Card.Meta = {
	exampleString,
	exampleArray,
	exampleNumber,
	exampleBoolean,
	exampleObject,
}

describe("Card.Meta", () => {
	it("is() truthy", () => {
		expect(pax2pay.Card.Meta.is(meta)).toBeTruthy()
	})
})
