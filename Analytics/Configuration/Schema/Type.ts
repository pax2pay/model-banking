import { isly } from "isly"

export type Type = typeof Type.values[number]

export namespace Type {
	export const values = [
		"STRING",
		"BYTES",
		"INTEGER",
		"FLOAT",
		"NUMERIC",
		"BIGNUMERIC",
		"BOOLEAN",
		"TIMESTAMP",
		"DATE",
		"TIME",
		"DATETIME",
		"INTERVAL",
		"RECORD",
		"GEOGRAPHY",
	] as const
	export const type = isly.string<Type>(values)
}
