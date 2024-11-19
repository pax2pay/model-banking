import { isly } from "isly"
import { Card } from "../Card"
import { Batch } from "./Batch"
import { Totals } from "./Totals"

export interface Creatable {
	totals: Totals
	processor: Card.Stack
	references?: string[] //File name
	batch: Batch
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		totals: Totals.type,
		processor: Card.Stack.type,
		references: isly.string().array().optional(),
		batch: Batch.type,
	})
}
