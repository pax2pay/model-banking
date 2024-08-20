import { filter, listener } from "cloudly-analytics-common"

export namespace Base {
	type Selectors = 
		| "realm"
		| "entity.type"
		| "entity.id"
		| "action"
		| "created"
		| "isError"
		| "version"
		| "source"
	export const mapping = {
		realm: "realm",
		entity: "entity.type",
		entityId: "entity.id",
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
		{ name: "entityId", type: "STRING" },
		{ name: "action", type: "STRING" },
		{ name: "created", type: "TIMESTAMP" },
		{ name: "isError", type: "BOOLEAN" },
		{ name: "source", type: "STRING" },
		{ name: "version", type: "STRING" },
	]
}
