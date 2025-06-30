import { authly } from "authly"
import { Realm } from "../../Realm"

export type Claims = Claims.LongTerm | Claims.ShortTerm
export namespace Claims {
	export interface Creatable {
		sub: string
		permission: string
		realm: Realm
	}
	export interface LongTerm extends Base {
		id: string
	}
	export interface ShortTerm extends Base {
		exp: number
	}
	export interface Base extends authly.Payload {
		aud: string
		iat: number
		iss: string
		sub: string
		permission: string
		realm: Realm
	}
	export const configuration = {
		aud: "https://banking.pax2pay.app",
		iss: "pax2pay",
	}
}
