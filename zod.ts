// re-export zod so that it can be auto imported as
// import { zod } from "zod"
export * as zod from "zod"
import * as zod from "zod/v4"
import { $strip } from "zod/v4/core"

export namespace zodHelper {
	type ExtraKeys<Schema, Type> = Exclude<keyof Schema, keyof Type> // Checks for extra keys in schema not defined in the model
	type ThrowIfExtraKeys<Schema, Type> = ExtraKeys<Schema, Type> extends never ? unknown : { [key: string]: never } // If there are extra keys, raise a type error
	export function fromType<Type>() {
		return <Schema extends { [K in keyof Type]: zod.ZodType<Type[K]> } & ThrowIfExtraKeys<Schema, Type>>(
			schema: Schema
		): zod.ZodObject<Schema, $strip> => {
			return zod.object(schema)
		}
	}
	export function is<T>(type: zod.ZodType<T>, value: unknown): value is T {
		return type.safeParse(value).success
	}
}
