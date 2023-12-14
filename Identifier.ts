import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"

export type Identifier = cryptly.Identifier
export namespace Identifier {
	export function generate(
		date: isoly.DateTime = isoly.DateTime.now(),
		length: cryptly.Identifier.Length = 16,
		ordering: "ordered" | "reversed" = "reversed"
	): string {
		return cryptly.Identifier.generate(length, ordering, isoly.DateTime.epoch(date, "milliseconds"))
	}
	export function timeOf(
		identifier: cryptly.Identifier,
		ordering: "ordered" | "reversed" = "reversed"
	): isoly.DateTime {
		const decoded = cryptly.Base64.decode(identifier, ordering)
		return isoly.DateTime.create(Number(new BigUint64Array(decoded.slice(decoded.length - 8).buffer)), "milliseconds")
	}
	export const type = isly.fromIs("Identifier", cryptly.Identifier.is)
	export const is = type.is
	export const flaw = type.flaw
}
