import { Authorization as ModelAuthorization } from "../../Authorization"

export type Authorization = ModelAuthorization

export namespace Authorization {
	export function from(authorization: ModelAuthorization): Authorization {
		return authorization
	}
	export const type = ModelAuthorization.type
	export const is = type.is
	export const flaw = type.flaw
}
