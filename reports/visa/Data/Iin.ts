import { isly } from "isly"

export type Iin = typeof Iin.values[number]
export namespace Iin {
	export type Idx = typeof Idx.values[number]
	export namespace Idx {
		export const values = ["45672555", "4567255", "45672557"] as const
		export const type = isly.string<Idx>(values)
	}
	export const values = [...Idx.values, "totalIdx", "44260108", "49359119", "45672554"] as const
}
