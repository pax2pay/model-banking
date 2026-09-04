import { zod } from "../../../zod"
import { Base } from "./Base"

export interface Overdraft extends Base {
	check: "overdraft"
	overdrafts: { account: string; balance: number }[]
}
export namespace Overdraft {
	export const typeZod: zod.ZodType<Overdraft> = Base.typeZod.extend({
		check: zod.literal("overdraft"),
		overdrafts: zod.array(zod.object({ account: zod.string(), balance: zod.number() })),
	})
}
