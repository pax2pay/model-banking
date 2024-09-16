import { AuditLog as AuditLogEvent } from "./AuditLog"
import { Base as EventBase } from "./Base"
import { Ledger as EventLedger } from "./Ledger"

export type Event = (
	| Event.Ledger.Transaction
	| Event.Ledger.Operation
	| Event.Ledger.Organization
	| Event.Ledger.Rule
	| Event.Ledger.Account
	| Event.Ledger.User
	| Event.AuditLog
) & { version: string }
export namespace Event {
	export type Base<T> = EventBase<T>
	export import Ledger = EventLedger
	export import AuditLog = AuditLogEvent
}
