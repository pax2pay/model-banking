import { isly } from "isly"

export type Category = string

export namespace Category {
	export const type = isly.fromIs<Category>("Merchant.Category", (value: any): value is Category =>
		/^\d{4}$/.test(value)
	)
}
