import { isly } from "isly"

export type SettlementEntry = string

export namespace SettlementEntry {
	export const type = isly.string(/^(?:settlement|fee)-\w+-\d{5}$/)
	export const is = type.is
}
