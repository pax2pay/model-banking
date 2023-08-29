import { Authorization as ModelAuthorization } from "../../Authorization"

export type Authorization = ModelAuthorization.Creatable

export namespace Authorization {
	export function from(authorization: ModelAuthorization.Creatable): Authorization {
		return authorization
	}
	export const type = ModelAuthorization.Creatable.type
	export const is = type.is
	export const flaw = type.flaw
}
