import { userwidgets } from "@userwidgets/model"
import { User } from "../User"

export type Permissions = Permissions.Organization | Permissions.Realm
export namespace Permissions {
	export function stringify(permissions: Permissions): string {
		return userwidgets.User.Permissions.stringify(permissions)
	}
	export interface Realm extends userwidgets.User.Permissions {
		organizations?:
			| {
					create?: true
					view?: true
					update?: true
					remove?: true
					accounts?: { balance?: true; view?: true; create?: true; change?: true; cancel?: true } | true
					rules?:
						| {
								edit?: true
								view?: true
								customer?: { edit?: true; view?: true } | true
								product?: { edit?: true; view?: true } | true
								fincrime?: { edit?: true; view?: true } | true
						  }
						| true
			  }
			| true
		transactions?: { create?: true; view?: true; resolve?: true; comment?: true } | true
		cards?: { create?: true; view?: true; change?: true; cancel?: true } | true
		rules?:
			| {
					edit?: true
					view?: true
					product?: { edit?: true; view?: true } | true
					fincrime?: { edit?: true; view?: true } | true
			  }
			| true
		settlements?: { create?: true; view?: true; amend?: true } | true
		treasury?: { rebalance?: true; view?: true } | true
		operations?: { view?: true } | true
		logs?: { view?: true } | true
	}
	export interface Organization extends userwidgets.User.Permissions {
		accounts?:
			| { balance?: true; view?: true; create?: true; change?: true; transactions?: { view?: true; create?: true } }
			| true
		cards?: { create?: true; view?: true; change?: true; cancel?: true } | true
	}
	export function from(permission: User.Access.Permission): Permissions | true {
		let result: Permissions | true = {}
		if (User.Access.Permission.Level.get(permission["*"]) >= 2)
			result = true
		else {
			if (permission["*"])
				result = {
					accounts: { view: true },
					cards: { view: true },
					logs: { view: true },
					operations: { view: true },
					organizations: { view: true },
					rules: { view: true },
					settlements: { view: true },
					transactions: { view: true },
					treasury: { view: true },
					org: { view: true },
					user: User.Access.Permission.Level.get(permission["user"]) >= 2 || { view: true },
					app: { view: true },
				}
			if (permission["account"])
				result.accounts = User.Access.Permission.Level.get(permission["account"]) >= 2 || {
					view: true,
				}
			if (permission["card"])
				result.cards = User.Access.Permission.Level.get(permission["card"]) >= 2 || {
					view: true,
				}
			if (permission["log"])
				result.logs = User.Access.Permission.Level.get(permission["log"]) >= 2 || {
					view: true,
				}
			if (permission["operation"])
				result.operations = User.Access.Permission.Level.get(permission["operation"]) >= 2 || {
					view: true,
				}
			if (permission["organization"])
				result.organizations = User.Access.Permission.Level.get(permission["organization"]) >= 2 || {
					view: true,
					rules: { view: true, customer: { view: true }, product: { view: true }, fincrime: { view: true } },
					accounts: { view: true },
				}
			if (permission["rule"])
				result.rules = User.Access.Permission.Level.get(permission["rule"]) >= 2 || {
					view: true,
					customer: { view: true },
					product: { view: true },
					fincrime: { view: true },
				}
			if (permission["settlement"])
				result.settlements = User.Access.Permission.Level.get(permission["settlement"]) >= 2 || { view: true }
			if (permission["transaction"])
				result.transactions = User.Access.Permission.Level.get(permission["transaction"]) >= 2 || { view: true }
			if (permission["treasury"])
				result.treasury = User.Access.Permission.Level.get(permission["treasury"]) >= 2 || { view: true }
		}
		return result
	}
}
