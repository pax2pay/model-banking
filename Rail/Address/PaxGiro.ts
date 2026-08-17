import { cryptly } from "cryptly"
import { isly } from "isly"
import { zod } from "../../zod"

export interface PaxGiro {
	type: "paxgiro"
	identifier: cryptly.Identifier
}
export namespace PaxGiro {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	export const type = isly.object<PaxGiro>({ type: isly.string("paxgiro"), identifier: isly.string() })
	export const typeZod = zod.object({ type: zod.literal("paxgiro"), identifier: zod.string() })
}
