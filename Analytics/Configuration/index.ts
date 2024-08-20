import { filter, listener } from "cloudly-analytics-common"
import { Base as ConfigBase } from "./Base"
import { Operation as ConfigOperation } from "./Operation"
import { Transaction as ConfigTransaction } from "./Transaction"

//cSpell: ignore: paxpay nonprod
export namespace Configuration {
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
		mapping: filter.Mapping.RecordWithSelector<string>,
		schema: listener.BigQueryApi.BaseField[],
		config: BigQueryTableConfig,
		filter: string
	): listener.BigQueryBaseConfiguration {
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
