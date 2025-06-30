import { Realm } from "../Realm"

export type Permission = Partial<Record<Realm, Partial<Record<Permission.Collection, Permission.Privilege>>>>
export namespace Permission {
	/** 
	 	read < write < developer < admin 
	*/
	export type Privilege = "read" | "write" | "developer" | "admin"
	export type Collection =
		| "account"
		| "card"
		| "log"
		| "operation"
		| "organization"
		| "rule" // realm rules
		| "settlement"
		| "transaction"
		| "treasury"
		| "*"
}
