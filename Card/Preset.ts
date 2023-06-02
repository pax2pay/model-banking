const preset = <const>["example"]

export type Preset = typeof preset[number]

export namespace Preset {
	export function is(value: any | Preset): value is Preset {
		return preset.includes(value)
	}
}
