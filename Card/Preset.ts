import { isly } from "isly"
import { Stack } from "./Stack"

export type Preset = typeof Preset.names[number]

// (test OR p2p)-scheme-interchange
export namespace Preset {
	export const names = [
		"p2p-mc-200",
		"test-mc-200",
		"test-ta-mq-200",
		"test-pg-200",
		"test-pg-150",
		"test-ta-pg-200",
		"test-ta-mc-200",
		"p2p-diners-175",
		"p2p-diners-200",
		"test-diners-200",
		"test-diners-202",
	] as const
	export const type = isly.string<Preset>(names)
	export const presets: Record<Preset, Stack> = {
		"p2p-mc-200": "uk-mc-tpl-marqeta",
		"p2p-diners-175": "uk-diners-dpg",
		"p2p-diners-200": "uk-diners-dpg",
		"test-diners-200": "testUK-diners-dpg",
		"test-diners-202": "testUK-diners-dpg",
		"test-mc-200": "testUK-marqeta",
		"test-ta-mq-200": "testUK-tpl-marqeta",
		"test-pg-200": "test-paxgiro",
		"test-ta-mc-200": "test-tpl-paxgiro",
		"test-ta-pg-200": "test-tpl-paxgiro",
		"test-pg-150": "test-paxgiro",
	}
}
