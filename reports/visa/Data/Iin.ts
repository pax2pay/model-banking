export type Iin = typeof Iin.values[number]
export namespace Iin {
	export const idx = ["45672555", "4567255", "45672557"] as const
	export function isIdx(value: string): boolean {
		return idx.includes(value as any)
	}
	export const values = [...idx, "totalIdx", "44260108", "49359119", "45672554"] as const
}
