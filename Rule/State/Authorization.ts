import { isoly } from "isoly"
import { Authorization as ModelAuthorization } from "../../Authorization"

export interface Authorization extends Omit<ModelAuthorization.Creatable, "amount"> {
	time: string
}
export namespace Authorization {
	export function from(authorization: ModelAuthorization.Creatable): Authorization {
		return { ...authorization, time: isoly.DateTime.getTime(isoly.DateTime.now()) }
	}
	export const type = ModelAuthorization.Creatable.type
	export const is = type.is
	export const flaw = type.flaw
}
