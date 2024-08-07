import { Mapping } from "./Mapping"
import { Schema } from "./Schema"

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
	} as const satisfies Mapping<Selectors>;
	export type Fields = keyof typeof mapping
	export const schema: Schema<Fields> = [
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
