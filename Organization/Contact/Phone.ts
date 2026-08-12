import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../zod"

export interface Phone {
	number: string
	code: isoly.CallingCode
}
export namespace Phone {
	export const type = isly.object<Phone>({
		number: isly.string(/^\d+$/),
		code: isly.fromIs("CallingCode", isoly.CallingCode.is),
	})
	export const typeZod = zod.object({
		number: zod.string().regex(/^\d+$/),
		code: zod.custom<isoly.CallingCode>(isoly.CallingCode.is),
	})
}
