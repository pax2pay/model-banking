import { isoly } from "isoly"
import { userwidgets } from "@userwidgets/model"
import { Realm } from "../Realm"
import { User } from "../User"
import { Permissions as KeyPermissions } from "./Permissions"
import { Roles as KeyRoles } from "./Roles"

type Claims = {
	organization: string
	realm: Realm
}

export type Key = userwidgets.User.Key<userwidgets.User.Key.Creatable.Claims | Claims, Key.Permissions>
export namespace Key {
	export import Permissions = KeyPermissions
	export type Roles = KeyRoles
	export const Roles = KeyRoles
	export namespace Roles {
		export type Role = KeyRoles.Role
		export namespace Organization {
			export type Role = KeyRoles.Organization.Role
		}
	}
	export function from(payload: User.JWT.Payload, token: string): Key {
		return {
			audience: payload.aud,
			email: payload.sub,
			realm: payload.realm,
			permissions: { [payload.realm + "-*"]: Permissions.from(payload.permission) },
			expires: payload.exp ? isoly.DateTime.create(payload.exp) : isoly.DateTime.nextYear(isoly.DateTime.now(), 10),
			issued: isoly.DateTime.create(payload.iat),
			issuer: payload.iss,
			name: { first: "", last: "" },
			token,
		}
	}
}
