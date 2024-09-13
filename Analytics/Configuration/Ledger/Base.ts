import { filter, listener } from "cloudly-analytics-common"
import { Event } from "../../Event"
import { FlattenKeys } from ".."
import { Base as ConfigBase } from "../Base"

export namespace Base {
	export type Selectors = FlattenKeys<Required<Event.Ledger.Base<any>>>
		| "version"
		| "source"
	export const mapping = {
		...ConfigBase.mapping,
		organization: "organization",
		account: "account",
		meta: { selector: "meta", transform: "array" },
		value: { selector: "value", transform: "stringify" }
		// eslint-disable-next-line
	} as const satisfies filter.Mapping.RecordWithSelector<Selectors>;
	export type Fields = keyof typeof mapping
	export const schema: listener.BigQueryApi.BaseField<Fields>[] = [
		...ConfigBase.schema,
		{ name: "organization", type: "STRING", mode: "NULLABLE" },
		{ name: "account", type: "STRING", mode: "NULLABLE" },
		{ name: "meta", type: "RECORD", mode: "REPEATED", fields: [
			{ name: "key", type: "STRING" },
			{ name: "value", type: "STRING" },
		]},
		{ name: "value", type: "STRING" }
	]
}
