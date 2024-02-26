import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
import { Batch } from "./Batch"
import { Total } from "./Total"

type Amounts = Partial<
	Record<
		isoly.Currency,
		{
			expected: {
				fee: {
					other: number
				}
				net: number
			}
		}
	>
>
export interface Creatable {
	amounts: Amounts
	processor: Card.Stack
	references?: string[] //File name
	batch: Batch
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		expected: Total.type.optional(),
		processor: Card.Stack.type,
		references: isly.string().array().optional(),
		batch: Batch.type,
	})
	export const is = type.is
	export const flaw = type.flaw
}
