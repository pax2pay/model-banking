import { isly } from "isly"
import { Merchant } from "../../Merchant"
import { zod } from "../../zod"

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
		export const type = isly.object<Range>({ from: Merchant.Category.type, to: Merchant.Category.type })
		export const typeZod: zod.ZodType<Range> = zod
			.object({ from: Merchant.Category.typeZod, to: Merchant.Category.typeZod })
			.meta({ id: "policy.Mcc.Group.Range" })
	}
	export const type = isly.object<Group>({ values: Merchant.Category.type.array(), ranges: Range.type.array() })
	export const typeZod: zod.ZodType<Group> = zod
		.object({ values: Merchant.Category.typeZod.array(), ranges: Range.typeZod.array() })
		.meta({ id: "policy.Mcc.Group" })
	export function within(set: Group, category: Merchant.Category): boolean {
		return set.values.includes(category) || set.ranges.some(r => r.from <= category && category <= r.to)
	}
}
