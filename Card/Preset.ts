import { isly } from "isly"

export type Preset = typeof Preset.names[number]

// "realm-scheme-interchange"
export namespace Preset {
	export const names = ["p2p-mc-200", "test-mc-200", "test-pg-200", "test-ta-pg-200", "test-ta-mc-200"] as const
	export const type = isly.string(names)
	export const is = type.is
	export const flaw = type.flaw
}
