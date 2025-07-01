import { authly } from "authly"
import { isly } from "isly"
import { Realm } from "../../Realm"
import { Permission } from "../Permission"

export type Payload = Payload.LongTerm | Payload.ShortTerm
export namespace Payload {
	export interface Creatable {
		sub: string
		permission: Permission
		realm: Realm
	}
	export interface Base extends authly.Payload {
		aud: string
		iat: number
		iss: string
		sub: string
		permission: Permission
		realm: Realm
	}
	export namespace Base {
		export const type = isly.object<Payload>({
			aud: isly.string(),
			iat: isly.number(),
			iss: isly.string(),
			sub: isly.string(),
			permission: Permission.type,
			realm: Realm.type,
		})
	}
	export interface LongTerm extends Base {
		id: string
	}
	export namespace LongTerm {
		export const type = Base.type.extend({ id: isly.string() })
	}
	export interface ShortTerm extends Base {
		exp: number
	}
	export namespace ShortTerm {
		export const type = Base.type.extend({ exp: isly.number() })
	}

	export const configuration = {
		aud: "https://banking.pax2pay.app",
		iss: "pax2pay",
	}
	export const type = isly.union<Payload>(LongTerm.type, ShortTerm.type)
}
