import { isly } from "isly"
import { Merchant } from "../../Merchant"

export interface Group {
	values: Merchant.Category[]
	ranges: Group.Range[]
}
export namespace Group {
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
	export const type = isly.object<Group>({
		values: Merchant.Category.type.array(),
		ranges: Range.type.array(),
	})
	export function within(set: Group, category: Merchant.Category): boolean {
		return set.values.includes(category) || set.ranges.some(r => r.from <= category && category <= r.to)
	}
}
