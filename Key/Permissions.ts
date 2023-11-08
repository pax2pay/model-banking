// import { flagly } from "flagly"
import { Realm as RealmName } from "../Realm"

export type Permissions = Permissions.Realms | Permissions.Organizations
export namespace Permissions {
	export type Realms = Partial<Record<"*" | RealmName, Realm>>
	export const roles = ["admin", "fincrime-readonly", "fincrime", "finance", "support"] as const
	export type Role = typeof roles[number]
	export const realmRole: Record<Role, Realm> = {
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
		support: {
			organizations: {
				create: true,
				view: true,
				accounts: true,
				rules: {
					view: true,
				},
			},
			transactions: { view: true },
			cards: { view: true, cancel: true },
			rules: { view: true },
		},
	}
	export type Realm =
		| {
				organizations?: {
					create?: true
					view?: true
					accounts?: { balance?: true; view?: true; create?: true; change?: true; cancel?: true } | true
					rules?:
						| {
								edit?: true
								view?: true
						  }
						| true
				}
				transactions?: { create?: true; view?: true; resolve?: true; comment?: true } | true
				cards?: { create?: true; view?: true; change?: true; cancel?: true } | true
				rules?: { edit?: true; view?: true } | true
				settlements?: { create?: true; view?: true; ammend?: true } | true
				treasury?: { rebalance?: true; view?: true } | true
				operations?: { view?: true } | true
		  }
		| true
	export type Organizations = Record<string, Organization>
	export const organizationRole = {
		admin: true,
		finance: {
			accounts: { balance: true, view: true, transactions: { view: true, create: true } },
			cards: true,
		},
		payments: { cards: true, transactions: { create: true }, accounts: { view: true } },
	}

	export type Organization =
		| {
				accounts?:
					| { balance?: true; view?: true; create?: true; change?: true; transactions?: { view?: true; create?: true } }
					| true
				cards?: { create?: true; view?: true; change?: true } | true
		  }
		| true
}
