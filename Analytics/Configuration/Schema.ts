import { Listener } from "cloudly-analytics-administration"

export type Schema<T extends string = string> = Schema.Field<T>[]
export namespace Schema {
	export import Field = Listener.Configuration.BigQuery.Api.BaseField
	export const type = Field.type.array()
}
