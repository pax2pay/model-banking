import { isly } from "isly"

const preset = ["example1"] as const

export type Preset = typeof preset[number]

export namespace Preset {
	export const type = isly.string(preset)
	export const is = type.is
}
