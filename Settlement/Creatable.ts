import { isly } from "isly"
import { Card } from "../Card"
import { zod } from "../zod"
import { Batch } from "./Batch"
import { Totals } from "./Totals"

export interface Creatable {
	totals: Totals
	processor: Card.Stack
	references?: string[] //File name
	batch: Batch
	count?: number
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		totals: Totals.type,
		processor: Card.Stack.type,
		references: isly.string().array().optional(),
		batch: Batch.type,
		count: isly.number().optional(),
	})
	export const typeZod = zod.object({
		totals: Totals.typeZod,
		processor: Card.Stack.typeZod,
		references: zod.array(zod.string()).optional(),
		batch: Batch.typeZod,
		count: zod.number().optional(),
	}) satisfies zod.ZodType<Creatable>
}
