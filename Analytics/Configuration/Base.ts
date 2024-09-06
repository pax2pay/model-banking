import { filter, listener } from "cloudly-analytics-common"
import { Event } from "../Event"
import type { FlattenKeys } from "."

export namespace Base {
	export type Selectors = Exclude<FlattenKeys<Required<Omit<Event.Base<any>, "value">>>, "entity">
		| "version"
		| "source"
	export const mapping = {
		realm: "realm",
		organization: "organization",
		account: "account",
		entityType: "entity.type",
		entity: "entity.id",
		action: "action",
		created: "created",
		isError: { selector: "isError", transform: "boolean" },
		version: "version",
		source: "source",
		// eslint-disable-next-line
	} as const satisfies filter.Mapping.RecordWithSelector<Selectors>;
	export type Fields = keyof typeof mapping
	export const schema: listener.BigQueryApi.BaseField<Fields>[] = [
		{ name: "realm", type: "STRING" },
		{ name: "organization", type: "STRING", mode: "NULLABLE" },
		{ name: "account", type: "STRING", mode: "NULLABLE" },
		{ name: "entity", type: "STRING" },
		{ name: "entityType", type: "STRING" },
		{ name: "action", type: "STRING" },
		{ name: "created", type: "TIMESTAMP" },
		{ name: "isError", type: "BOOLEAN", mode: "NULLABLE" },
		{ name: "source", type: "STRING" },
		{ name: "version", type: "STRING" },
	]
}
