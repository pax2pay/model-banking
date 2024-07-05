import { Field as SchemaField } from "./Field"

export type Schema<T extends string = string> = Schema.Field<T>[]
export namespace Schema {
	export import Field = SchemaField
	export const type = Field.type.array()
}
