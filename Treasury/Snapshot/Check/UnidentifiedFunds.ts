import { zod } from "../../../zod"
import { Base as ResultBase } from "./Base"

export interface UnidentifiedFunds extends ResultBase {
	check: "unidentified funds"
	account: string
	balance: number
}
export namespace UnidentifiedFunds {
	export const typeZod: zod.ZodType<UnidentifiedFunds> = ResultBase.typeZod.extend({
		check: zod.literal("unidentified funds"),
		account: zod.string(),
		balance: zod.number(),
	})
}
