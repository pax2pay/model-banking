import { zod } from "../../../zod"
import { Checks } from "./Checks"
import { Result } from "./Result"

export interface Base {
	check: Checks
	result: Result
}
export namespace Base {
	export const typeZod = zod.object({
		check: Checks.typeZod,
		result: Result.typeZod,
	}) satisfies zod.ZodType<Base>
}
