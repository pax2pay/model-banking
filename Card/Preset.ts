import { isly } from "isly"
import { isly as isly2 } from "isly2"
import { Stack } from "./Stack"

export type Preset = typeof Preset.names[number]

// (test OR p2p)-scheme-interchange
export namespace Preset {
	export const names = [
		"p2p-mc-200",
		"test-pg-200",
		"test-pg-150",
		"test-ta-pg-200",
		"test-ta-mc-200",
		"p2p-diners-175",
		"p2p-diners-200",
	] as const
	export const type = isly.string<Preset>(names)
	export const type2 = isly2
		.string<Preset>("value", ...names)
		.rename("Preset")
		.describe("Card configuration (iin/scheme/interchange).")
	export const presets: Record<Preset, Stack> = {
		"p2p-mc-200": "uk-mc-tpl-marqeta",
		"p2p-diners-175": "uk-diners-dpg",
		"p2p-diners-200": "uk-diners-dpg",
		"test-pg-200": "test-paxgiro",
		"test-ta-mc-200": "test-tpl-paxgiro",
		"test-ta-pg-200": "test-tpl-paxgiro",
		"test-pg-150": "test-paxgiro",
	}
}
