import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../Realm"
import { zod } from "../zod"
import { Access as UserAccess } from "./Access"
import { Identity as UserIdentity } from "./Identity"
import { JWT as UserJWT } from "./JWT"
import { mfa as userMfa } from "./mfa"
import { Password as UserPassword } from "./Password"

export interface User {
	email: string
	access: User.Access
	changed: isoly.DateTime
	created: isoly.DateTime
	password: { changed: isoly.DateTime }
}
export namespace User {
	export import Access = UserAccess
	export import Identity = UserIdentity
	export import JWT = UserJWT
	export import mfa = userMfa
	export import Password = UserPassword
	export function fromInvite(invite: Invite): User {
		const now = isoly.DateTime.now()
		return { email: invite.email, access: invite.access, changed: now, created: now, password: { changed: now } }
	}
	export function toJWTPayloadCreatable(user: User, realm: Realm): User.JWT.Payload.Creatable {
		return { sub: user.email, permission: { ...(user.access[realm] ?? {}), ...(user.access["*"] ?? {}) }, realm }
	}
	export type Creatable = zod.infer<typeof Creatable.typeZod>
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			invite: isly.object({ emailHash: isly.string(), token: isly.string() }),
			password: Password.Creatable.type,
		})
		export const typeZod = zod.object({
			invite: zod.object({ emailHash: zod.string(), token: zod.string() }),
			password: Password.Creatable.typeZod,
		})
	}
	export type Invite = Omit<Invite.Storable, "emailHash" | "token" | "messageId">
	export namespace Invite {
		export interface Storable {
			emailHash: string
			token: string
			email: string
			access: Access
			messageId?: string
			created: isoly.DateTime
			expires: isoly.DateTime
		}
		export namespace Storable {
			export function toModel({ emailHash, token, messageId, ...rest }: Storable): Invite {
				return { ...rest }
			}
		}
		export type Creatable = zod.infer<typeof Creatable.typeZod>
		export namespace Creatable {
			export const typeZod = zod.object({ email: zod.string(), access: Access.typeZod })
			export const type = isly.object<Creatable>({ email: isly.string(), access: Access.type })
		}
	}
	export type PasswordReset = { email: string }
	export namespace PasswordReset {
		export type Updatable = zod.infer<typeof Updatable.typeZod>
		export namespace Updatable {
			export const typeZod = zod.object({
				emailHash: zod.string(),
				token: zod.string(),
				password: Password.Creatable.typeZod,
			})
		}
		export interface Storable {
			emailHash: string
			token: string
			email: string
			messageId?: string
			created: isoly.DateTime
			expires: isoly.DateTime
		}
		export namespace Storable {
			export function toModel(storable: Storable): PasswordReset {
				return { email: storable.email }
			}
		}
		export type Creatable = zod.infer<typeof Creatable.typeZod>
		export namespace Creatable {
			export const typeZod = zod.object({ email: zod.string() })
		}
	}
}
