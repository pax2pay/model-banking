import { userwidgets } from "@userwidgets/model"
import { Permissions as KeyPermissions } from "./Permissions"

export interface Key extends userwidgets.User.Key {
	permissions: Key.Permissions
}
export namespace Key {
	export type Permissions = KeyPermissions
	export namespace Permissions {
		export type Realms = KeyPermissions.Realms
		export type Organizations = KeyPermissions.Organizations
		export type Realm = KeyPermissions.Realm
		export type Organization = KeyPermissions.Organization
		export type Role = KeyPermissions.Role
		export type Roles = KeyPermissions.Roles
	}
	export const Permissions = KeyPermissions
}
