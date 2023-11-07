import { isoly } from "isoly"
import { isly } from "isly"
import { Authorization as ModelAuthorization } from "../../Authorization"

export interface Authorization extends Omit<ModelAuthorization.Creatable, "amount"> {
	time: string
}
export namespace Authorization {
	export function from(authorization: ModelAuthorization.Creatable): Authorization {
		return { ...authorization, time: isoly.DateTime.getTime(isoly.DateTime.now()) }
	}
	// isly.object().omit(): coming soon!!
	export const type = isly.object<Authorization>({ ...(ModelAuthorization.type as any), time: isly.string() })
	export const is = type.is
	export const flaw = type.flaw
}
