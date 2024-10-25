import { storage } from "cloudly-storage"
import { isly } from "isly"

export type Audit = storage.AuditLogger.Entry<Audit.Type>
export namespace Audit {
	export type Type = {
		rule: "change" | "add" | "remove"
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
		account:
			| "buffer"
			| "counterpart-remove"
			| "counterpart-replace"
			| "listener-create"
			| "listener-remove"
			| "rail-create"
			| "rail-remove"
			| "rail-replace"
			| "rule-create"
			| "rule-remove"
			| "rule-replace"
			| "create"
			| "status"
			| "operation"
			| "remove"
			| "update"
		label: "create" | "remove" | "replace"
		transaction: "operation" | "cancel" | "system" | "update" | "note"
		organization:
			| "group-replace"
			| "listener-create"
			| "listener-remove"
			| "rule-create"
			| "rule-remove"
			| "rule-replace"
			| "create"
			| "remove"
			| "update"
		route: "create"
		clearbank: "assessmentFailed" | "validationFailed"
	}
	export type Resource = typeof Resource.values[number]
	export namespace Resource {
		export const values = ["rule", "user", "settlements", "marqeta"] as const
		export const type = isly.string(values)
	}
}
