import { isly } from "isly"

describe("Organization.Code", () => {
	it("contains only valid url characters", () => {
		const Code = isly.string(new RegExp(/^[A-Za-z0-9\-_]+$/))
		expect(Code.is("aaaa-bbbb_")).toBeTruthy()
		expect(Code.is("aaaa-bbbb ")).toBeFalsy()
		expect(Code.is("aa aa")).toBeFalsy()
		expect(Code.is("aa&aa")).toBeFalsy()
		expect(Code.is("aa|aa")).toBeFalsy()
		expect(Code.is("")).toBeFalsy()
	})
})
