import { zod } from "../../../zod"
import { Base } from "./Base"

export interface LedgerIntegrity extends Base {
	check: "ledger integrity"
	opening: { balance: number }
	ledger: { change: number }
	closing: { balance: number }
	failed: string[]
	incomplete: string[]
	passed: number
	total: number
}
export namespace LedgerIntegrity {
	export const typeZod: zod.ZodType<LedgerIntegrity> = Base.typeZod.extend({
		check: zod.literal("ledger integrity"),
		opening: zod.object({ balance: zod.number() }),
		ledger: zod.object({ change: zod.number() }),
		closing: zod.object({ balance: zod.number() }),
		failed: zod.array(zod.string()),
		incomplete: zod.array(zod.string()),
		passed: zod.number(),
		total: zod.number(),
	})
}
