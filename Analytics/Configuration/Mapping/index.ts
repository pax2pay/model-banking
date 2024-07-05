import { isly } from "isly"
import { Field as FieldMapping } from "./Field"

export type Mapping<T extends string = string> = Record<T, Mapping.Field>

export namespace Mapping {
	export import Field = FieldMapping
	export const type = isly.record<Mapping>(isly.string(), Field.type)
}
