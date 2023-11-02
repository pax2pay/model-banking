import { userwidgets } from "@userwidgets/model"
import { Permissions as KeyPermissions } from "./Permissions"

export interface Key extends userwidgets.User.Key {
	permissions: Key.Permissions.Realms
}
export namespace Key {
	export namespace Permissions {
		export type Realms = KeyPermissions.Realms
		export type Organizations = KeyPermissions.Organizations
		export type Accounts = KeyPermissions.Accounts
	}
}
