import { storage } from "cloudly-storage"
import { isly } from "isly"

export type Audit = storage.AuditLogger.Entry<Audit.Type>
export namespace Audit {
	export type Type = {
		rule: "change" | "add"
		user: "login" | "change"
		settlements:
			| "archive"
			| "collect"
			| "create"
			| "inspect"
			| "payout"
			| "remove"
			| "expect"
			| "issue"
			| "create-entry"
			| "replace-entry"
		marqeta: "gateway-create" | "gateway-update" | "hook-register" | "hook-update" | "product-create" | "user-create"
	}
	export type Resource = typeof Resource.values[number]
	export namespace Resource {
		export const values = ["rule", "user", "settlements", "marqeta"] as const
		export const type = isly.string(values)
	}
}
