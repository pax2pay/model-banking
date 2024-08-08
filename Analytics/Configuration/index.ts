import { Listener } from "cloudly-analytics-administration"
import { Base as ConfigBase } from "./Base"
import { Mapping as AnalyticsMapping } from "./Mapping"
import { Operation as ConfigOperation } from "./Operation"
import { Schema as AnalyticsSchema } from "./Schema"
import { Transaction as ConfigTransaction } from "./Transaction"

//cSpell: ignore: paxpay nonprod
export namespace Configuration {
	export import Mapping = AnalyticsMapping
	export import Schema = AnalyticsSchema
	export import Base = ConfigBase
	export import Transaction = ConfigTransaction
	export import Operation = ConfigOperation
	export type BigQueryTableConfig = {
		projectName: "paxpay-prod" | "paxpay-nonprod"
		datasetName: string
		tableName: string
	}
	export function create(
		name: string,
		mapping: Mapping,
		schema: Schema,
		config: BigQueryTableConfig,
		filter: string
	): Listener.Configuration.BigQuery.BaseConfiguration {
		return {
			name,
			type: "bigquery",
			filter: [
				{
					type: "selectively",
					expression: filter,
				},
				{ type: "useragent" },
				{
					type: "mapping",
					mapping: {
						...Base.mapping,
						...mapping,
					},
				},
			],
			batchSize: 10,
			batchInterval: 3,
			...config,
			tableSchema: [...Base.schema, ...schema],
		}
	}
	export const backup = create(
		"backup",
		{ value: { selector: "value", transform: "stringify" } },
		[{ name: "value", type: "STRING" }],
		{
			projectName: "paxpay-prod",
			datasetName: "pays_ledger",
			tableName: "backup",
		},
		"source:pax2pay-worker-banking-ledger realm:within(uk, eu)"
	)
	export const operation = create(
		"operations",
		Operation.mapping,
		Operation.schema,
		{
			projectName: "paxpay-prod",
			datasetName: "pays_ledger",
			tableName: "operations",
		},
		"source:pax2pay-worker-banking-ledger entity:operation realm:within(uk, eu)"
	)
	export const transaction = create(
		"transactions",
		Transaction.mapping,
		Transaction.schema,
		{
			projectName: "paxpay-prod",
			datasetName: "pays_ledger",
			tableName: "transactions",
		},
		"source:pax2pay-worker-banking-ledger entity:transaction realm:within(uk, eu)"
	)
}
