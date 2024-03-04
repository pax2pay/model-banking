import { isly } from "isly"
import type { Rail } from "../Rail"
import type { Realm } from "../Realm"

export type Supplier = typeof Supplier.names[number]

export namespace Supplier {
	export const names = ["paxgiro", "clearbank"] as const
	export const type = isly.string<Supplier>(names)
	export const is = type.is
	export const accounts: Record<
		Supplier,
		Partial<Record<Realm, { id: string; reference: string; address: Rail.Address }[]>>
	> = {
		clearbank: {
			uk: [
				{
					id: "clrbnk01",
					reference: "bae99651-596c-415b-8225-2159b1bf6e9f",
					address: { type: "iban", iban: "GB19CLRB04081800000011", holder: "Pax2pay" },
				},
				{
					id: "clrbnk02",
					reference: "348a6e2b-c001-41c4-a70c-1bc26369ac8b",
					address: { type: "iban", iban: "GB29CLRB04081800000025", holder: "Pax2pay" },
				},
				{
					id: "clrbnk03",
					reference: "b54ebc59-c1b8-4ce5-8b49-f37b7764332b",
					address: { type: "iban", iban: "GB88CLRB04081800000030", holder: "Pax2pay" },
				},
				{
					id: "clrbnk04",
					reference: "275865c5-893c-4696-aea0-9b0922f0516d",
					address: { type: "iban", iban: "GB93CLRB04081800000037", holder: "Pax2pay" },
				},
			],
			testUK: [],
		},
		paxgiro: { test: [] },
	}
}
