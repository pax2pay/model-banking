import { isly } from "isly"
import { Mode as FieldMode } from "./Mode"
import { Type as FieldType } from "./Type"

export type Field<T extends string = string> = { name: T; type: Field.Type; mode?: Field.Mode; fields?: Field[] }

export namespace Field {
	export import Type = FieldType
	export import Mode = FieldMode
	export const type = isly.object<Field>({
		name: isly.string(),
		type: Type.type,
		mode: Mode.type.optional(),
		fields: isly.lazy((): isly.Type<Field<string>[] | undefined> => type.array().optional(), "fields"),
	})
}
