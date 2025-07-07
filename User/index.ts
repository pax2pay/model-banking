import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../Realm"
import { Access as UserAccess } from "./Access"
import { Identity as UserIdentity } from "./Identity"
import { JWT as UserJWT } from "./JWT"
import { Me as UserMe } from "./Me"
import { Password as UserPassword } from "./Password"

export interface User {
	email: string
	access: User.Access
	changed: isoly.DateTime
	created: isoly.DateTime
	password: {
		changed: isoly.DateTime
	}
}
export namespace User {
	export import Access = UserAccess
	export import Identity = UserIdentity
	export import JWT = UserJWT
	export import Me = UserMe
	export import Password = UserPassword
	export function fromInvite(invite: Invite): User {
		const now = isoly.DateTime.now()
		return {
			email: invite.email,
			access: invite.access,
			changed: now,
			created: now,
			password: {
				changed: now,
			},
		}
	}
	export function toJWTPayloadCreatable(user: User, realm: Realm): User.JWT.Payload.Creatable {
		return {
			sub: user.email,
			permission: { ...(user.access[realm] ?? {}), ...(user.access["*"] ?? {}) },
			realm,
		}
	}
	export interface Creatable {
		invite: string
		password: Password.Creatable
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			invite: isly.string(),
			password: isly.object({ new: isly.string(), repeat: isly.string() }),
		})
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
