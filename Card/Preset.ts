import { isly } from "isly"

export type Preset = typeof Preset.names[number]

export namespace Preset {
	export const names = ["example1", "p2p-pg-200", "p2p-mc-200"] as const
	export const type = isly.string(names) //isly.union(isly.string("p2p-pg-200"), isly.string("p2p-mc-200"))
	export const is = type.is
	export const flaw = type.flaw
}
