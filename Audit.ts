import { storage } from "cloudly-storage"
import { isly } from "isly"

export type Audit = storage.AuditLogger.Entry<Audit.Type>
export namespace Audit {
	export type Type = {
		rule: "change" | "add"
		user: "login" | "change"
		organization: "change" | "add"
		account: "change" | "add" | "status"
		card: "change" | "add"
		transaction: "status" | "add"
		operation: "manual"
		label: "change" | "add"
	}
	export type Resource = typeof Resource.values[number]
	export namespace Resource {
		export const values = [
			"rule",
			"user",
			"organization",
			"account",
			"card",
			"transaction",
			"operation",
			"label",
		] as const
		export const type = isly.string(values)
	}
}
