import { storage } from "cloudly-storage"

export type Audit = storage.AuditLogger.Entry<Audit.Type>
export namespace Audit {
	export type Type = { rule: "change" | "add" }
	export type Resource = Extract<keyof Type, string>
}
