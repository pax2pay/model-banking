import { Mapping } from "./Mapping"
import { Schema } from "./Schema"

export namespace Configuration {
	export const baseFields = [
		"realm",
		"entity",
		"entityId",
		"action",
		"created",
		"isError",
		"version",
		"source",
	] as const
	export type BaseFields = typeof baseFields[number]
	export const baseMapping: Mapping<BaseFields> = {
		realm: "realm",
		entity: "entity.type",
		entityId: "entity.id",
		action: "action",
		created: "created",
		isError: { selector: "isError", transform: "boolean" },
		version: "version",
		source: "source",
	}
	export const baseTableSchema: Schema<BaseFields> = [
		{ name: "realm", type: "STRING" },
		{ name: "entity", type: "STRING" },
		{ name: "entityId", type: "STRING" },
		{ name: "action", type: "STRING" },
		{ name: "created", type: "TIMESTAMP" },
		{ name: "isError", type: "BOOLEAN" },
		{ name: "source", type: "STRING" },
		{ name: "version", type: "STRING" },
	]
	export function create(
		mapping: Mapping,
		schema: Schema,
		config: { projectName?: "paxpay-prod" | "paxpay-nonprod"; datasetName?: string; tableName: string },
		filter?: string
	) {
		return {
			name: "ledger-events",
			type: "bigquery",
			filter: [
				{
					type: "selectively",
					expression: filter ?? "source:pax2pay-worker-banking-ledger",
				},
				{ type: "useragent" },
				{
					type: "mapping",
					mapping: {
						...baseMapping,
						...mapping,
					},
				},
			],
			batchSize: 10,
			batchInterval: 3,
			projectName: "paxpay-nonprod",
			datasetName: "banking_ledger",
			...config,
			tableSchema: [...baseTableSchema, ...schema],
		}
	}
	export const backup = create(
		{ value: { selector: "value", transform: "stringify" } },
		[{ name: "value", type: "STRING" }],
		{ tableName: "backup_test" }
	)
}
