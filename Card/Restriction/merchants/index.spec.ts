import * as fs from "fs"
import agencies from "./agencies.json"
import airlines from "./airlines.json"
import cruises from "./cruises.json"
import ferries from "./ferries.json"
import hotelChains from "./hotel-chains.json"
import hotels from "./hotels.json"
import marketing from "./marketing.json"
import { Merchant } from "./Merchant"
import misc from "./misc.json"
import parking from "./parking.json"
import rail from "./rail.json"
import transfers from "./transfers.json"

// Generates the file containing all the merchants by normalizing the data from the jsons in this directory
describe.skip("Card.Restrictions.merchants", () => {
	it("generates merchants file", () => {
		const merchants = agencies
			.concat(airlines as any[])
			.concat(cruises as any[])
			.concat(ferries as any[])
			.concat(hotelChains as any[])
			.concat(hotels as any[])
			.concat(misc as any[])
			.concat(marketing as any[])
			.concat(parking as any[])
			.concat(rail as any[])
			.concat(transfers as any[])
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
