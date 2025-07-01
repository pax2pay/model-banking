import { isoly } from "isoly"
import { Identity as UserIdentity } from "./Identity"
import { JWT as UserJWT } from "./JWT"
import { Password as UserPassword } from "./Password"
import { Permission } from "./Permission"

export interface User {
	email: string
	// password: User.Password
	permission: Permission
	changed: isoly.DateTime
	created: isoly.DateTime
}
export namespace User {
	export import Identity = UserIdentity
	export import JWT = UserJWT
	export import Password = UserPassword
	export function fromCreatable(email: string, permission: Permission, password: User.Password): User {
		return {
			email,
			// password,
			permission,
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
		permission: Permission
	}
	export namespace Invite {
		export interface Creatable {
			email: string
			permission: Permission
		}
	}
}
