import { visa } from "./visa"

describe("VisaComponent", () => {
	test("renders VisaComponent", () => {
		expect(visa.toCsv({})).toEqual("")
	})
})
