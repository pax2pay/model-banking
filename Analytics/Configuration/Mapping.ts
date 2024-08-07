import { Filter } from "cloudly-analytics-administration"
import { isly } from "isly"

export type Mapping<T extends string = string> = Filter.Mapping.RecordWithSelector<T>

export namespace Mapping {
	export type Field = string | Filter.Mapping.Getter
	export namespace Field {
		export import Transform = Filter.Mapping.Transform
		export const type = isly.union(isly.string(), Filter.Mapping.Getter.type)
	}
	export const type = isly.record<Mapping>(isly.string(), Field.type)
}
