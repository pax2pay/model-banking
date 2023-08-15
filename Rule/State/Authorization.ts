import type { Authorization as ModelAuthorization } from "../../Authorization"

export type Authorization = ModelAuthorization.Creatable

export namespace Authorization {
	export function from(authorization: ModelAuthorization.Creatable): Authorization {
		return authorization
	}
}
