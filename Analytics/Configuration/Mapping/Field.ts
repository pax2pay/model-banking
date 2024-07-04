import { isly } from "isly"
import { Transform as FieldTransform } from "./Transform"

type Transformer = { selector: string; transform: Field.Transform }
export type Field = string | Transformer

export namespace Field {
	export import Transform = FieldTransform
	export const type = isly.union<string | Transformer, string, Transformer>(
		isly.string(),
		isly.object<Transformer>({
			selector: isly.string(),
			transform: Transform.type,
		})
	)
}
