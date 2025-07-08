import * as fs from "fs"
import airlines from "./airlines.json"
import hotels from "./hotels.json"
import { Merchant } from "./Merchant"
import misc from "./misc.json"

// Generates the file containing all the merchants by normalizing the data from the jsons in this directory
describe.skip("Card.Restrictions.merchants", () => {
	it("generates merchants file", () => {
		const merchants = airlines.concat(misc).concat(hotels)
		const parsed = merchants.map(m => Merchant.parse(m))
		expect(parsed.map(m => Merchant.type.is(m)).every(m => m == true)).toBe(true)
		fs.writeFileSync(
			"./Card/Restriction/merchants/index.ts",
			`// from: https://github.com/pax2pay/merchant-categoriser\n// using: https://onlineyamltools.com/convert-yaml-to-json\nexport const merchants = {` +
				parsed.map(p => `"${p?.name}": ${JSON.stringify(p, null, 2)}`) +
				"} as const",
			"utf-8"
		)
	})
})
