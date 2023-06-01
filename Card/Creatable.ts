import * as isoly from "isoly"

export interface Creatable {
	expires: isoly.DateTime | isoly.DateRange
	limits: Partial<Record<isoly.Currency, number>>
	singleUse?: boolean
	rules: string[]
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return false
	}
}
