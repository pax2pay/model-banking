import { isly } from "isly"
import { isly as isly2 } from "isly2"
import { Realm } from "../Realm"
import { Stack } from "./Stack"

export type Preset = typeof Preset.names[number]

// (test OR p2p)-scheme-interchange
export namespace Preset {
	export const names = [
		"p2p-diners-175",
		"p2p-diners-200",
		"p2p-mc-200",
		"p2p-visa-bid-115",
		"p2p-visa-bp-140",
		"p2p-visa-cdd-185",
		"p2p-visa-idx-140",
		"p2p-visa-idx-160",
		"p2p-visa-idx-200",
		"test-pg-150",
		"test-pg-200",
		"test-ta-mc-200",
		"test-ta-pg-200",
		"test-ta-pg-bc-200",
		"test-diners-175",
	] as const
	export const type = isly.string<Preset>(names)
	export const type2 = isly2
		.string<Preset>("value", ...names)
		.rename("Preset")
		.describe("Card configuration (iin/scheme/interchange).")
	export const forRealm: Record<Realm, Preset[]> = {
		test: ["test-pg-150", "test-pg-200", "test-ta-mc-200", "test-ta-pg-200", "test-ta-pg-bc-200", "test-diners-175"],
		uk: [
			"p2p-diners-175",
			"p2p-diners-200",
			"p2p-mc-200",
			"p2p-visa-bid-115",
			"p2p-visa-bp-140",
			"p2p-visa-cdd-185",
			"p2p-visa-idx-140",
			"p2p-visa-idx-160",
			"p2p-visa-idx-200",
		],
		eea: [],
	}
	export const presets: Record<Preset, Stack> = {
		"p2p-diners-175": "uk-diners-dpg",
		"p2p-diners-200": "uk-diners-dpg",
		"p2p-mc-200": "uk-mc-tpl-marqeta",
		"p2p-visa-bid-115": "uk-visa-tpl-marqeta",
		"p2p-visa-bp-140": "uk-visa-tpl-marqeta",
		"p2p-visa-cdd-185": "uk-visa-tpl-marqeta",
		"p2p-visa-idx-140": "uk-visa-tpl-marqeta",
		"p2p-visa-idx-160": "uk-visa-tpl-marqeta",
		"p2p-visa-idx-200": "uk-visa-tpl-marqeta",
		"test-pg-150": "test-paxgiro",
		"test-pg-200": "test-paxgiro",
		"test-ta-mc-200": "test-tpl-paxgiro",
		"test-ta-pg-200": "test-tpl-paxgiro",
		"test-ta-pg-bc-200": "test-tpl-paxgiro",
		"test-diners-175": "test-diners-clowd9",
	}
}
