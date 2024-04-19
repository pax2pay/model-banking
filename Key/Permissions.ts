import { userwidgets } from "@userwidgets/model"

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
								customer: { edit?: true; view?: true }
								product: { edit?: true; view?: true }
								fincrime: { edit?: true; view?: true }
						  }
						| true
			  }
			| true
		transactions?: { create?: true; view?: true; resolve?: true; comment?: true } | true
		cards?: { create?: true; view?: true; change?: true; cancel?: true } | true
		rules?:
			| {
					product: { edit?: true; view?: true }
					fincrime: { edit?: true; view?: true }
			  }
			| true
		settlements?: { create?: true; view?: true; ammend?: true } | true
		treasury?: { rebalance?: true; view?: true } | true
		operations?: { view?: true } | true
	}
	export interface Organization extends userwidgets.User.Permissions {
		accounts?:
			| { balance?: true; view?: true; create?: true; change?: true; transactions?: { view?: true; create?: true } }
			| true
		cards?: { create?: true; view?: true; change?: true; cancel?: true } | true
	}
}
