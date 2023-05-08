import * as cryptly from "cryptly"
import { userwidgets } from "@userwidgets/model"
import { Realm } from "../Realm"

export interface Creatable extends userwidgets.User.Key.Creatable {
	permissions: {
		"*"?: userwidgets.User.Permissions.Application | undefined
		[organization: string]: userwidgets.User.Permissions.Organization | undefined
	} & Permissions.Realms
}

export interface Key extends Creatable, userwidgets.User.Key {
	id: cryptly.Identifier
	permissions: {
		"*"?: userwidgets.User.Permissions.Application | undefined
		[organization: string]: userwidgets.User.Permissions.Organization | undefined
	} & Permissions.Realms
}

export namespace Permissions {
	export type Realms = Partial<
		Record<
			Realm | "*",
			userwidgets.User.Permissions.Permission & {
				organizations: Permissions.Organizations
				treasury: userwidgets.User.Permissions.Permission
			}
		>
	>
	export type Organizations = Record<
		string | "*",
		userwidgets.User.Permissions.Permission & {
			accounts: Permissions.Accounts
			rules: userwidgets.User.Permissions.Permission
		}
	>
	export type Accounts = Record<
		string | "*",
		{ transactions: userwidgets.User.Permissions.Permission; rail: userwidgets.User.Permissions.Permission }
	>
}
