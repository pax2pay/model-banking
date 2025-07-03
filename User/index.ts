import { isoly } from "isoly"
import { isly } from "isly"
import { Access as UserAccess } from "./Access"
import { Identity as UserIdentity } from "./Identity"
import { JWT as UserJWT } from "./JWT"
import { Password as UserPassword } from "./Password"

export interface User {
	email: string
	// password: User.Password
	access: User.Access
	changed: isoly.DateTime
	created: isoly.DateTime
}
export namespace User {
	export import Access = UserAccess
	export import Identity = UserIdentity
	export import JWT = UserJWT
	export import Password = UserPassword
	export function fromCreatable(email: string, access: Access): User {
		return {
			email,
			// password,
			access,
			changed: isoly.DateTime.now(),
			created: isoly.DateTime.now(),
		}
	}
	export interface Creatable {
		invite: string
		email: string
		password: { value: string; confirm: string }
	}
	export interface Invite {
		id: string
		email: string
		access: Access
	}
	export namespace Invite {
		export interface Creatable {
			email: string
			access: Access
		}
		export namespace Creatable {
			export const type = isly.object<Creatable>({ email: isly.string(), access: Access.type })
		}
	}
}
