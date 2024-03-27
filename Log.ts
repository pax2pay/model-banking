import { isoly } from "isoly"

// user, card, organization, account, transaction, rule

type Type = { rule: "change" | "add" }

export type Log = AuditLog<Type>

//cloudly
export type AuditLog<T extends Record<string, string>> = AuditEntry<T>[]

export interface AuditEntry<T extends Record<string, string>> {
	id: string
	created: isoly.DateTime
	resource: {
		id: string
		type: keyof T
		action: T[keyof T]
		before?: unknown
		after?: unknown
	}
	by: string // user or system
	messages: string[]
}
