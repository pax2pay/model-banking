import { isly } from "isly"
import { Card } from "../Card"
import { Total } from "./Total"

export interface Creatable {
	expected?: Total
	processor: Card.Stack
	reference: string
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		expected: Total.type.optional(),
		processor: Card.Stack.type,
		reference: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
