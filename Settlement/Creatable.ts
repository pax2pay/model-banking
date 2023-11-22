import { isly } from "isly"
import { Card } from "../Card"
import { Batch } from "./Batch"
import { Total } from "./Total"

export interface Creatable {
	expected?: Total
	processor: Card.Stack
	reference: string
	batch: Batch
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		expected: Total.type.optional(),
		processor: Card.Stack.type,
		reference: isly.string(),
		batch: Batch.type,
	})
	export const is = type.is
	export const flaw = type.flaw
}
