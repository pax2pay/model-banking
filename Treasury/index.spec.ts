import { isoly } from "isoly"
import { pax2pay } from "../index"

describe("Treasury", () => {
	it("key", () => {
		const now = isoly.DateTime.now()
		expect(pax2pay.Treasury.key(isoly.DateTime.next(now))).toEqual(pax2pay.Treasury.key(now))
		expect(pax2pay.Treasury.key(isoly.DateTime.next(now, { hours: 2 }))).toEqual(pax2pay.Treasury.key(now))
		expect(pax2pay.Treasury.key(isoly.DateTime.next(now, { minutes: 10 }))).toEqual(pax2pay.Treasury.key(now))
		expect(pax2pay.Treasury.key(isoly.DateTime.truncate(now, "hours"))).toEqual(pax2pay.Treasury.key(now))
	})
})
