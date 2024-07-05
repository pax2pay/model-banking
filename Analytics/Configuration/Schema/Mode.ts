import { isly } from "isly"

export type Mode = typeof Mode.values[number]

export namespace Mode {
	export const values = ["NULLABLE", "REQUIRED", "REPEATED"] as const
	export const type = isly.string<Mode>(values)
}
