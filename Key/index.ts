import { userwidgets } from "@userwidgets/model"
import { Permissions as KeyPermissions } from "./Permissions"

export interface Key extends userwidgets.User.Key {
	permissions: Key.Permissions
	role?: Key.Permissions.Role
}
export namespace Key {
	export type Permissions = KeyPermissions
	export namespace Permissions {
		export type Realms = KeyPermissions.Realms
		export type Organizations = KeyPermissions.Organizations
		export type Role = KeyPermissions.Role
	}
	export const Permissions = KeyPermissions
}
