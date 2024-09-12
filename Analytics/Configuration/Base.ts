import { filter, listener } from "cloudly-analytics-common"
import { Event } from "../Event"
import type { FlattenKeys } from ".";

export namespace Base {
	export type Selectors = FlattenKeys<Required<Omit<Event.Base<any>, "value">>>
		| "version"
		| "source"
	export const mapping = {
		realm: "realm",
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
		{ name: "entity", type: "STRING" },
		{ name: "entityType", type: "STRING" },
		{ name: "action", type: "STRING" },
		{ name: "created", type: "TIMESTAMP" },
		{ name: "isError", type: "BOOLEAN", mode: "NULLABLE" },
		{ name: "source", type: "STRING" },
		{ name: "version", type: "STRING" },
	]
}
