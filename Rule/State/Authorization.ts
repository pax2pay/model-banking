import type { Authorization as ModelAuthorization } from "../../Authorization"

export type Authorization = ModelAuthorization

export namespace Authorization {
	export function from(authorization: ModelAuthorization): Authorization {
		return authorization
	}
}
