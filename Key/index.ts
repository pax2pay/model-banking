import { userwidgets } from "@userwidgets/model"
import { Realm } from "../Realm"
import { Permissions as KeyPermissions } from "./Permissions"
import { Roles as KeyRoles } from "./Roles"

type Claims = {
	organization: string
	realm: Realm
}

export type Key = userwidgets.User.Key<userwidgets.User.Key.Creatable.Claims | Claims, Key.Permissions>
export namespace Key {
	export type Permissions = KeyPermissions
	export namespace Permissions {
		export type Realm = KeyPermissions.Realm
		export type Organization = KeyPermissions.Organization
	}
	export type Roles = KeyRoles
	export const Roles = KeyRoles
	export namespace Roles {
		export type Role = KeyRoles.Role
		export namespace Organization {
			export type Role = KeyRoles.Organization.Role
		}
	}
}
