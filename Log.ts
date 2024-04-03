import { storage } from "cloudly-storage"

export type Log = storage.AuditLogger.Entry<Log.Type>
export namespace Log {
	export type Type = { rule: "change" | "add" }
	export type Resource = Extract<keyof Type, string>
}
