import { cryptly } from "cryptly"
import { isoly } from "isoly"

export namespace Identifier {
	export function generate(
		length: cryptly.Identifier.Length = 16,
		ordering: "ordered" | "reversed" = "reversed",
		date: isoly.DateTime = isoly.DateTime.now()
	): string {
		return cryptly.Identifier.generate(length, ordering, isoly.DateTime.epoch(date))
	}
}
