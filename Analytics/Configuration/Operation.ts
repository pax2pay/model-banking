import { Mapping } from "./Mapping"
import { Schema } from "./Schema"

export namespace Operation {
	export const mapping = {
		account: "value.account",
		currency: "value.currency",
		changes: { selector: "value.changes", transform: "array" },
		type: "value.type",
		transaction: "value.transaction",
		counter: { selector: "value.counter", transform: "integer"},
		created: "value.created",
		signature: "value.signature",
		previous: "value.previous",
		// eslint-disable-next-line
	} as const satisfies Mapping
	export type Fields = keyof typeof mapping
	export const schema: Schema<Fields> = [
		{ name: "account", type: "STRING" },
		{ name: "currency", type: "STRING" },
		{ name: "changes", type: "RECORD", mode: "REPEATED", fields: [
			{ name: "key", type: "STRING" },
			{ name: "value", type: "RECORD", fields: [
				{ name: "type", type: "STRING" },
				{ name: "amount", type: "NUMERIC" },
				{ name: "status", type: "STRING" },
				{ name: "result", type: "STRING", mode: "NULLABLE" },
			]}
		] },
		{ name: "type", type: "STRING" },
		{ name: "transaction", type: "STRING" },
		{ name: "counter", type: "NUMERIC" },
		{ name: "created", type: "DATETIME" },
		{ name: "signature", type: "STRING" },
		{ name: "previous", type: "STRING" },
	]
}
