import { storage } from "cloudly-storage"
import { isly } from "isly"

export type Audit = storage.AuditLogger.Entry<Audit.Type>
export namespace Audit {
	export type Type = { rule: "change" | "add"; user: "login" | "change"; card: "create" | "change" | "remove" }
	export type Resource = typeof Resource.values[number]
	export namespace Resource {
		export const values = ["rule", "user"] as const
		export const type = isly.string(values)
	}
}
