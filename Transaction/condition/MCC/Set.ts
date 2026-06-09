import { isly } from "isly"
import { Merchant } from "../../../Merchant"

export interface Set {
	values: Merchant.Category[]
	ranges: Set.Range[]
}
export namespace Set {
	export interface Range {
		from: Merchant.Category
		to: Merchant.Category
	}
	export namespace Range {
		export const type = isly.object<Range>({
			from: Merchant.Category.type,
			to: Merchant.Category.type,
		})
	}
	export const type = isly.object<Set>({
		values: Merchant.Category.type.array(),
		ranges: Range.type.array(),
	})
	export function within(set: Set, category: string): boolean {
		return (
			set.values.includes(category as Merchant.Category) || set.ranges.some(r => r.from <= category && r.to >= category)
		)
	}
}
