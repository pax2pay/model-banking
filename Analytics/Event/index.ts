import { Account as AccountEvent } from "./Account"
import { AuditLog as AuditLogEvent } from "./AuditLog"
import { Base as EventBase } from "./Base"
import { Operation as OperationEvent } from "./Operation"
import { Organization as OrganizationEvent } from "./Organization"
import { Rule as RuleEvent } from "./Rule"
import { Transaction as TransactionEvent } from "./Transaction"

export type Event = (Event.Transaction | Event.Operation | Event.AuditLog) & { version: string }
export namespace Event {
	export type Base<T> = EventBase<T>
	export import Transaction = TransactionEvent
	export import Account = AccountEvent
	export import Organization = OrganizationEvent
	export import Rule = RuleEvent
	export import Operation = OperationEvent
	export import AuditLog = AuditLogEvent
}
