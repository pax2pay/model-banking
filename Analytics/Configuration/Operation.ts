import { filter, listener } from "cloudly-analytics-common"

export namespace Operation {
	export const mapping = {
		account: "value.account",
		currency: "value.currency",
		changes: { selector: "value.changes", transform: "array" },
		type: "value.type",
		transaction: "value.transaction",
		counter: { selector: "value.counter", transform: "integer"},
		operationCreated: "value.created",
		signature: "value.signature",
		previous: "value.previous",
		// eslint-disable-next-line
	} as const satisfies filter.Mapping.RecordWithSelector<string>;
	export type Fields = keyof typeof mapping
	export const schema: listener.BigQueryApi.BaseField<Fields>[] = [
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
		{ name: "operationCreated", type: "DATETIME" },
		{ name: "signature", type: "STRING" },
		{ name: "previous", type: "STRING" },
	]
}
