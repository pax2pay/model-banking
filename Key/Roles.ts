import { userwidgets } from "@userwidgets/model"
import { isly } from "isly"
import { Realm } from "../Realm"
import { Permissions } from "./Permissions"

type OrganizationCode = string
export type Roles =
	| Partial<Record<`${Realm | "*"}-*`, (Roles.Realm.Role | Roles.Organization.Role)[]>>
	| Partial<Record<`${Realm | "*"}-${OrganizationCode}`, Roles.Organization.Role[]>>
export namespace Roles {
	export type Role = Realm.Role | Organization.Role
	export function get(realmOrganization: string) {
		const [realm] = realmOrganization.split("-")
		return [
			...Object.entries(Realm.definitions).map(([role, value]) => ({
				label: "realm-" + role,
				permissions: () => Permissions.stringify({ [realm + "-*"]: value }),
			})),
			...Object.entries(Organization.definitions).map(([role, value]) => ({
				label: "organization-" + role,
				permissions: (id: string) => Permissions.stringify({ [id]: value }),
			})),
		]
	}
	export function resolve(roles: Roles): Permissions {
		let result = {}
		for (const [key, role] of Object.entries(roles)) {
			const [, organizationCode] = key.split("-")
			result =
				role?.reduce(
					(r, role) =>
						userwidgets.User.Permissions.merge(r, {
							[key]:
								organizationCode == "*" && Realm.type.is(role)
									? Realm.definitions[role]
									: Organization.definitions[role as Organization.Role],
						}),
					result
				) ?? result
		}
		return result
	}
	export namespace Realm {
		export type Roles = Partial<Record<Role, true>>
		export type Role = typeof roles[number]
		export const roles = ["admin", "fincrime-readonly", "fincrime", "finance", "operations", "support"] as const
		export const type = isly.string(roles)
		export const definitions: Record<Role, Permissions.Realm | true> = {
			admin: true,
			"fincrime-readonly": {
				organizations: {
					view: true,
					accounts: { view: true },
					rules: { view: true },
				},
				transactions: { view: true },
				cards: { view: true },
				rules: { view: true },
			},
			fincrime: {
				organizations: {
					view: true,
					accounts: { balance: true, view: true },
					rules: true,
				},
				transactions: { view: true, resolve: true, comment: true },
				cards: { view: true, cancel: true },
				rules: true,
			},
			finance: {
				treasury: { rebalance: true, view: true },
				settlements: { view: true },
			},
			operations: {
				organizations: {
					create: true,
					update: true,
					accounts: true,
					rules: true,
				},
			},
			support: {
				organizations: {
					create: true,
					view: true,
					accounts: true,
					rules: {
						view: true,
						edit: true,
					},
				},
				transactions: { view: true },
				cards: { view: true, cancel: true },
				rules: { view: true },
			},
		}
	}
	export namespace Organization {
		export type Roles = Partial<Record<Role, true>>
		export type Role = typeof roles[number]
		export const roles = ["admin", "finance", "payments"] as const
		export const definitions: Record<Role, Permissions.Organization | true> = {
			admin: true,
			finance: {
				accounts: { balance: true, view: true, transactions: { view: true, create: true } },
				cards: true,
			},
			payments: { cards: true, accounts: { view: true, transactions: { create: true } } },
		}
	}
}
