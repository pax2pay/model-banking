import { isoly } from "isoly"
import { isly } from "isly"

export interface Phone {
	number: string
	code: isoly.CallingCode
}
export namespace Phone {
	export const type = isly.object<Phone>({
		number: isly.string(/^\d+$/),
		code: isly.fromIs("CallingCode", isoly.CallingCode.is),
	})
}
