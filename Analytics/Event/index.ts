import { Account as AccountEvent } from "./Account"
import { Authorization as AuthorizationEvent } from "./Authorization"
import { Base as EventBase } from "./Base"
import { Card as CardEvent } from "./Card"
import { Operation as OperationEvent } from "./Operation"
import { Organization as OrganizationEvent } from "./Organization"
import { Rule as RuleEvent } from "./Rule"
import { Settlement as SettlementEvent } from "./Settlement"
import { Snapshot as SnapshotEvent } from "./Snapshot"
import { Transaction as TransactionEvent } from "./Transaction"

export type Event = (
	| Event.Organization
	| Event.Account
	| Event.Rule
	| Event.Transaction
	| Event.Operation
	| Event.Card
	| Event.Authorization
	| Event.Settlement
	| Event.Snapshot
) & { version: string }
export namespace Event {
	export type Base<T> = EventBase<T>
	export import Organization = OrganizationEvent
	export import Account = AccountEvent
	export import Rule = RuleEvent
	export import Transaction = TransactionEvent
	export import Operation = OperationEvent
	export import Card = CardEvent
	export import Authorization = AuthorizationEvent
	export import Settlement = SettlementEvent
	export import Snapshot = SnapshotEvent
}
