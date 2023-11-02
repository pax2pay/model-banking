import { flagly } from "flagly"
import { Realm } from "../Realm"

export namespace Permissions {
	export type Realms = Partial<
		Record<
			"*" | Realm,
			flagly.Flags & {
				organizations: Permissions.Organizations
				transactions: flagly.Flags
				cards: flagly.Flags
				rules: flagly.Flags
				settlements: flagly.Flags
				treasury: flagly.Flags
				operations: flagly.Flags
			}
		>
	>
	export type Organizations = Record<
		"*" | string,
		flagly.Flags & {
			accounts: Permissions.Accounts
			rules: flagly.Flags
		}
	>
	export type Accounts = Record<"*" | string, flagly.Flags & { transactions: flagly.Flags; cards: flagly.Flags }>
}
