import * as fs from "fs"
import airlines from "./airlines.json"
import hotels from "./hotels.json"
import { Merchant } from "./Merchant"
import misc from "./misc.json"

describe.skip("Card.Restrictions.Merchants", () => {
	it("yaml", () => {
		const merchants = airlines.concat(misc).concat(hotels)
		const parsed = merchants.map(m => Merchant.parse(m))
		expect(parsed.map(m => Merchant.type.is(m)).every(m => m == true)).toBe(true)
		fs.writeFileSync(
			"./Card/Restriction/merchants/index.ts",
			`// from: https://github.com/pax2pay/merchant-categoriser\n// using: https://onlineyamltools.com/convert-yaml-to-json\nexport const merchants = ` +
				JSON.stringify(parsed, null, 2) +
				" as const",
			"utf-8"
		)
	})
})
