export type Supplier = typeof Supplier.names[number]

export namespace Supplier {
	export function is(value: any | Supplier): value is Supplier {
		return value && names.includes(value)
	}
	export const names = ["paxgiro", "clearbank"] as const
}
